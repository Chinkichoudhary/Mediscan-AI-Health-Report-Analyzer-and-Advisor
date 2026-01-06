# backend/inference_engine.py
from typing import List, Dict, Optional
from db_config import get_connection

FALLBACK_KB: Dict[str, Dict[str, str]] = {
    "Anemia": {
        "description": "Low hemoglobin, hematocrit, or RBC suggests anemia; causes include iron/B12/folate deficiency or blood loss.",
        "diet": "Iron-rich foods (spinach, legumes, lean red meat). Add vitamin C with meals; consider folate and B12 from diet.",
        "medicines": "Iron/B12/folate supplements only under medical guidance."
    },
    "Infection": {
        "description": "Elevated WBC may indicate infection or inflammation.",
        "diet": "Hydration, balanced meals, fruits/vegetables; rest.",
        "medicines": "Symptomatic care; antibiotics only if prescribed after clinical evaluation."
    },
    "Liver Disorder": {
        "description": "Elevated ALT/AST/Alkaline Phosphatase may suggest liver inflammation/injury.",
        "diet": "Avoid alcohol and high-fat foods; prefer fiber-rich, balanced diet.",
        "medicines": "Consult a physician; avoid hepatotoxic drugs."
    },
    "Kidney Impairment": {
        "description": "High Creatinine/Urea suggests reduced kidney function.",
        "diet": "Low-sodium; protein restriction only if advised by a doctor; manage BP/diabetes if present.",
        "medicines": "Avoid NSAIDs; follow nephrologist guidance."
    },
    "Thyroid Disorder": {
        "description": "Abnormal TSH can indicate hypo- or hyperthyroidism.",
        "diet": "Balanced diet; discuss iodine intake with clinician.",
        "medicines": "Thyroid medication only under medical supervision."
    },
    "Hyperuricemia / Gout risk": {
        "description": "High uric acid increases gout risk.",
        "diet": "Limit red meat, shellfish, beer; hydrate well.",
        "medicines": "Uric acid–lowering drugs only if prescribed."
    }
}

def _norm(s: Optional[str]) -> str:
    return (s or "").strip().lower()

def infer_conditions(structured_results: List[Dict]) -> List[Dict]:
    if not structured_results:
        return []

    detected = set()

    for t in structured_results:
        name = _norm(t.get("test_name") or t.get("test name"))
        status = _norm(t.get("status") or t.get("Status"))

        # Hematology → Anemia
        if any(k in name for k in ["hemoglobin", "hb", "rbc", "hematocrit", "pcv"]):
            if status == "low":
                detected.add("Anemia")

        # WBC → Infection
        if "wbc" in name and status == "high":
            detected.add("Infection")

        # LFT → Liver Disorder
        if any(k in name for k in ["sgpt", "alt", "sgot", "ast", "alkaline"]):
            if status == "high":
                detected.add("Liver Disorder")

        # KFT → Kidney Impairment
        if any(k in name for k in ["creatinine", "urea", "bun"]):
            if status == "high":
                detected.add("Kidney Impairment")

        # Uric Acid
        if "uric" in name and status == "high":
            detected.add("Hyperuricemia / Gout risk")

        # TSH → Thyroid Disorder
        if "tsh" in name and status in {"high", "low"}:
            detected.add("Thyroid Disorder")

    recommendations: List[Dict] = []

    # Try DB enrichment (optional; will fall back silently if unavailable)
    conn = None
    cur = None
    try:
        conn = get_connection()
        cur = conn.cursor()
    except Exception:
        cur = None
        conn = None

    for cond in sorted(detected):
        data = None

        if cur:
            try:
                cur.execute(
                    """
                    SELECT c.name, c.description, r.diet, r.medicines
                    FROM conditions c
                    LEFT JOIN recommendations r ON c.condition_id = r.condition_id
                    WHERE c.name LIKE %s
                    LIMIT 1
                    """,
                    (f"%{cond}%",)
                )
                row = cur.fetchone()
                if row:
                    data = {
                        "condition": row[0],
                        "description": row[1] or FALLBACK_KB.get(cond, {}).get("description"),
                        "diet": row[2] or FALLBACK_KB.get(cond, {}).get("diet"),
                        "medicines": row[3] or FALLBACK_KB.get(cond, {}).get("medicines"),
                    }
            except Exception:
                data = None

        if not data:
            kb = FALLBACK_KB.get(cond)
            if kb:
                data = {
                    "condition": cond,
                    "description": kb.get("description"),
                    "diet": kb.get("diet"),
                    "medicines": kb.get("medicines"),
                }
            else:
                data = {
                    "condition": cond,
                    "description": "Detected via lab pattern. Please consult a physician.",
                    "diet": "Seek clinician guidance for tailored diet.",
                    "medicines": "Only under medical supervision.",
                }

        recommendations.append(data)

    if cur:
        try:
            cur.close()
        except:
            pass
    if conn:
        try:
            conn.close()
        except:
            pass

    return recommendations
