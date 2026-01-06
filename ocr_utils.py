# ocr_utils.py
import os
import re
from typing import Tuple, List
from pdf2image import convert_from_path
from PIL import Image
import cv2
import numpy as np

# Optional: docx support
try:
    import docx2txt
    DOCX_AVAILABLE = True
except Exception:
    DOCX_AVAILABLE = False
    print("[WARN] docx2txt not available. DOCX files will not be processed.") # RECTIFIED: Added warning

# Set your poppler path if needed (Windows). Keep empty if poppler is in PATH.
POPPLER_PATH = r""  # e.g. r"C:\path\to\poppler\bin" or "" on Linux

# Tesseract: if not in PATH, set path here. Keep empty if tesseract is in PATH.
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
import pytesseract

def preprocess_image_for_ocr(cv_img: np.ndarray) -> np.ndarray:
    """Preprocess cv2 image to maximize OCR accuracy."""
    # convert to gray
    gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
    # denoise
    denoised = cv2.fastNlMeansDenoising(gray, None, 10, 7, 21)
    # adaptive threshold (handles uneven illumination)
    th = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                               cv2.THRESH_BINARY, 15, 8)
    # optionally enlarge small images
    h, w = th.shape
    if w < 1000:
        scale = int(1000 / w) + 1
        th = cv2.resize(th, (w * scale, h * scale), interpolation=cv2.INTER_LINEAR)
    return th

def image_file_to_text(path: str) -> str:
    """Read image (png/jpg/tif/bmp) and return OCR text."""
    img = cv2.imread(path)
    if img is None:
        raise ValueError(f"Unable to read image: {path}")
    proc = preprocess_image_for_ocr(img)
    # write to temp for pytesseract stable reading
    temp = path + ".ocr.png"
    cv2.imwrite(temp, proc)
    text = pytesseract.image_to_string(Image.open(temp))
    try:
        os.remove(temp)
    except:
        pass
    return text

def pdf_to_text(pdf_path: str) -> str:
    """Convert a PDF (scanned or text) to text using pdf2image + tesseract."""
    # RECTIFIED: Increased DPI to 300 for better OCR from PDFs
    images = convert_from_path(pdf_path, poppler_path=POPPLER_PATH or None, dpi=300) 
    page_texts = []
    for i, img in enumerate(images):
        # convert PIL to cv2
        cv_img = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
        proc = preprocess_image_for_ocr(cv_img)
        temp_img = f"_ocr_page_{i}.png"
        cv2.imwrite(temp_img, proc)
        page_texts.append(pytesseract.image_to_string(Image.open(temp_img)))
        try:
            os.remove(temp_img)
        except:
            pass
    return "\n".join(page_texts).strip()

def docx_to_text(docx_path: str) -> str:
    """Extract text from .docx (requires docx2txt installed)."""
    if not DOCX_AVAILABLE:
        raise RuntimeError("docx2txt not installed. pip install docx2txt")
    return docx2txt.process(docx_path)

def file_to_text(input_path: str) -> Tuple[str, List[str]]:
    """
    Generic entrypoint: accepts pdf, jpg, png, jpeg, tif, tiff, bmp, docx.
    Returns (full_text, list_of_lines).
    """
    ext = os.path.splitext(input_path)[1].lower()
    
    # RECTIFIED: Image types now fully supported
    if ext in [".png", ".jpg", ".jpeg", ".tif", ".tiff", ".bmp"]:
        text = image_file_to_text(input_path)
    elif ext in [".pdf"]:
        text = pdf_to_text(input_path)
    # RECTIFIED: Only supporting docx via docx2txt
    elif ext in [".docx"] and DOCX_AVAILABLE: 
        text = docx_to_text(input_path)
    elif ext in [".doc"]:
         raise ValueError(".doc files are not supported without specialized libraries. Please convert to .pdf or .docx.")
    else:
        # RECTIFIED: Updated error message
        raise ValueError("Unsupported file type. Supported: pdf, png, jpg, jpeg, tif, tiff, bmp, docx")

    # cleanup lines: remove excessive spaces, fix commas
    lines = []
    for ln in text.splitlines():
        ln = ln.strip()
        ln = re.sub(r"\s{2,}", " ", ln)
        if ln:
            lines.append(ln)
    full_text = "\n".join(lines)
    return full_text, lines