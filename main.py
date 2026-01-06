from fastapi import FastAPI, UploadFile, File, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import json
import uuid
import traceback
from passlib.context import CryptContext

from ocr_utils import file_to_text
from nlp import parse_lab_results
from db_config import get_connection
from inference_engine import infer_conditions
from nlp.utils import _status_from_range

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # bcrypt only uses first 72 bytes
    return pwd_context.verify(plain_password[:72], hashed_password)

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/health")
def health():
    return {"status": "alive"}

# ✅ Account registration endpoint
@app.post("/register")
async def register_user(
    first_name: str = Body(...),
    last_name: str = Body(...),
    email: str = Body(...),
    password: str = Body(...)
):
    conn = None
    cur = None
    try:
        conn = get_connection()
        cur = conn.cursor()

        # Check if email already exists
        cur.execute("SELECT user_id FROM users WHERE email = %s", (email,))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered")

        # ✅ Truncate password before hashing
        safe_pw = password[:72]
        hashed_pw = hash_password(safe_pw)

        # Insert new user
        cur.execute(
            "INSERT INTO users (first_name, last_name, email, password_hash) VALUES (%s, %s, %s, %s)",
            (first_name, last_name, email, hashed_pw),
        )
        conn.commit()

        user_id = cur.lastrowid

        return {"message": "Account created successfully", "user_id": user_id}

    except Exception as e:
        traceback.print_exc()
        print("[ERROR] Registration failed:", e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

# ✅ Login endpoint
@app.post("/login")
async def login_user(
    email: str = Body(...),
    password: str = Body(...)
):
    conn = None
    cur = None
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        # Find user by email
        cur.execute("SELECT user_id, first_name, last_name, email, password_hash FROM users WHERE email = %s", (email,))
        user = cur.fetchone()

        if not user:
            raise HTTPException(status_code=400, detail="Invalid email or password")

        # Verify password
        if not verify_password(password, user["password_hash"]):
            raise HTTPException(status_code=400, detail="Invalid email or password")

        return {
            "message": "Login successful",
            "user_id": user["user_id"],
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "email": user["email"]
        }

    except Exception as e:
        traceback.print_exc()
        print("[ERROR] Login failed:", e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

# ✅ Normalize lab results for inference
def normalize_for_inference(r: dict) -> dict:
    name = r.get("test_name") or r.get("test name") or ""
    value = r.get("value") or ""
    ref_min = r.get("ref_min") or ""
    ref_max = r.get("ref_max") or ""
    unit = r.get("unit") or ""

    status = _status_from_range(value, ref_min, ref_max)

    return {
        "test_name": name.strip().lower(),
        "status": status.strip().lower(),
        "value": value,
        "unit": unit,
        "ref_min": ref_min,
        "ref_max": ref_max,
    }

# ✅ Report analysis endpoint
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    filename = file.filename
    ext = os.path.splitext(filename)[1].lower()
    if ext not in [".pdf", ".png", ".jpg", ".jpeg", ".tif", ".tiff", ".bmp", ".docx"]:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Supported: pdf, png, jpg, jpeg, tif, tiff, bmp, docx."
        )

    temp_name = f"{uuid.uuid4().hex}_{filename}"
    temp_path = os.path.join(UPLOAD_DIR, temp_name)
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        full_text, lines = file_to_text(temp_path)
        structured_models = parse_lab_results(full_text)
        structured_results = [m.dict() for m in structured_models]
        normalized_results = [normalize_for_inference(r) for r in structured_results]
        recommendations = infer_conditions(normalized_results) or []

        print("\n--- STRUCTURED RESULTS ---")
        for i, r in enumerate(structured_results):
            print(f"[{i}] {r}")
        print("\n--- NORMALIZED FOR INFERENCE ---")
        for i, r in enumerate(normalized_results):
            print(f"[{i}] {r}")
        print("\n--- RECOMMENDATIONS ---")
        for i, rec in enumerate(recommendations):
            print(f"[{i}] {rec}")
        print("--- END DEBUG ---\n")

        conn = None
        cur = None
        try:
            conn = get_connection()
            cur = conn.cursor()

            # Insert patient
            cur.execute(
                "INSERT INTO patients (name, age, sex) VALUES (%s, %s, %s)",
                ("Unknown", None, None),
            )
            conn.commit()
            patient_id = cur.lastrowid

            # Insert report
            cur.execute(
                "INSERT INTO reports (patient_id, report_type, report_date, raw_text, structured_data) "
                "VALUES (%s, %s, %s, %s, %s)",
                (patient_id, "Auto", None, full_text, json.dumps(structured_results)),
            )
            conn.commit()
            report_id = cur.lastrowid

            # Insert tests and results
            for r in structured_results:
                test_name = r.get("test_name")
                value = r.get("value")
                unit = r.get("unit")
                ref_min = r.get("ref_min")
                ref_max = r.get("ref_max")
                status = r.get("status")

                cur.execute(
                    "SELECT test_id FROM tests WHERE test_name LIKE %s LIMIT 1",
                    (f"%{test_name}%",),
                )
                row = cur.fetchone()
                if row:
                    test_id = row[0]
                else:
                    cur.execute(
                        "INSERT INTO tests (test_name, unit, ref_min, ref_max) VALUES (%s, %s, %s, %s)",
                        (test_name, unit, ref_min, ref_max),
                    )
                    conn.commit()
                    test_id = cur.lastrowid

                cur.execute(
                    "INSERT INTO results (report_id, test_id, value, status) VALUES (%s, %s, %s, %s)",
                    (report_id, test_id, value, status),
                )
            conn.commit()

        except Exception as e:
            traceback.print_exc()
            print("[WARN] DB store failed:", e)
        finally:
            try:
                if cur:
                    cur.close()
                if conn:
                    conn.close()
            except:
                pass

        return {
            "filename": filename,
            "ocr_text": full_text,
            "structured_results": structured_results,
            "possible_conditions": [rec["condition"] for rec in recommendations if rec.get("condition")],
            "recommendations": recommendations,
            "disclaimer": "This analysis is AI-generated for informational purposes only. Always consult a certified doctor before making any medical decisions.",
        }

    finally:
        try:
            os.remove(temp_path)
        except:
            pass
