# backend/nlp/utils.py
import re
from typing import List, Tuple, Optional
from pydantic import BaseModel

class StructuredResult(BaseModel):
    test_name: str
    value: str = ""
    unit: str = ""
    ref_min: str = ""
    ref_max: str = ""
    status: str = "Unknown"

# --- Regex helpers ---
NUM_RE = re.compile(r"[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?")
RANGE_RE = re.compile(r"(?P<min>[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)\s*[-–]\s*(?P<max>[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)")

# --- Fallback reference ranges (global) ---
FALLBACK_RANGES = {
    "hemoglobin": ("13", "17"),
    
    "rbc count": ("4.7", "6.1"),
    "wbc": ("4", "11"),
    
    "platelet": ("150", "450"),
    
    "hematocrit": ("40", "50"),
    "pcv": ("40", "50"),
}

# --- Skip keywords (non-test/demographics/notes) ---
SKIP_KEYWORDS = [
    "sex", "age", "report date", "possible anemia", "patient", "doctor",
    "clinic", "comment", "impression", "reference", "note", "result date"
]

# --- Helpers ---
def _clean_unit_text(s: str) -> str:
    return s.strip()

def _to_number(raw: str) -> Optional[float]:
    """
    Converts textual numbers with Indian/medical units:
    - '12,000 /mm3' -> 12000
    - '1.8 lakhs/cmm' -> 180000
    - '4.8 million/mm3' -> 4800000
    - '199 x10^3/uL' -> 199000
    - '12.2 k/cmm' -> 12200
    """
    if not raw:
        return None
    s = raw.strip().lower()
    s = s.replace(",", "")
    # Extract base number
    m = NUM_RE.search(s)
    if not m:
        return None
    base = float(m.group(0))

    # Scale by suffixes / scientific notation fragments
    if "lakh" in s or "lakhs" in s:
        base *= 100000.0
    elif "million" in s or "mill" in s:
        base *= 1000000.0
    elif " x10^3" in s or "x10^3" in s:
        base *= 1000.0
    elif " x10^6" in s or "x10^6" in s:
        base *= 1000000.0
    elif " x10^9" in s or "x10^9" in s:
        base *= 1000000000.0
    elif " k" in s or s.endswith("k"):
        base *= 1000.0

    return base

def _extract_range(raw: str) -> Tuple[str, str]:
    if not raw:
        return "", ""
    s = raw.lower().replace("ref range", "").replace("reference range", "")
    s = s.replace(",", "").strip()
    m = RANGE_RE.search(s)
    if not m:
        return "", ""
    return m.group("min"), m.group("max")

def _status_from_range(value: str, ref_min: str, ref_max: str) -> str:
    try:
        v = _to_number(value)
        lo = _to_number(ref_min)
        hi = _to_number(ref_max)
        if v is None or lo is None or hi is None:
            return "Unknown"
        if v < lo:
            return "Low"
        if v > hi:
            return "High"
        return "Normal"
    except Exception:
        return "Unknown"

# --- Main parser ---
def parse_lab_results(text: str) -> List[StructuredResult]:
    """
    Robust CBC parser with:
    - Regex extraction for 'Name: value unit (min - max)' and 'Ref Range'
    - Fallback ranges for common tests when ref ranges are missing
    - Fallback parsing for unmatched lines containing known test names
    - Skips demographics/comments (Sex, Age, Report Date, Possible Anemia, etc.)
    """
    results: List[StructuredResult] = []
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]

    for ln in lines:
        low_ln = ln.lower()

        # Skip obvious non-test lines
        if any(kw in low_ln for kw in SKIP_KEYWORDS):
            continue
        # Must contain a number to be considered a test line
        if not NUM_RE.search(low_ln):
            continue

        # Try regex-based parsing
        m = re.search(
            r"(?P<name>[A-Za-z ()/]+):?\s*(?P<value>[-+]?\d*\.?\d+(?:,\d{3})?(?:\s*[A-Za-z/%^0-9\-\._]+)?)"
            r"(?:\s*(?:Ref Range|Reference Range|ref|range)\s*(?P<range>[^)]*[\d\.\- ][^)]*))?",
            ln
        )
        if m:
            name = m.group("name").strip()
            raw_value = m.group("value").strip()
            raw_range = (m.group("range") or "").strip()

            # Extract unit (optional)
            unit = ""
            unit_m = re.search(r"[-+]?\d*\.?\d+(?:,\d{3})?\s*([A-Za-z/%^0-9\-\._]+)", raw_value)
            if unit_m:
                unit = _clean_unit_text(unit_m.group(1))

            # Numeric string for value
            num_m = NUM_RE.search(raw_value.replace(",", " "))
            value_str = num_m.group(0) if num_m else raw_value

            # Extract min/max or fallback
            ref_min, ref_max = _extract_range(raw_range)
            if not ref_min or not ref_max:
               key = name.strip().lower()
               for fallback_key in FALLBACK_RANGES:
                   if fallback_key in key:
                      ref_min, ref_max = FALLBACK_RANGES[fallback_key]
                      break


            status = _status_from_range(value_str, ref_min, ref_max)

            results.append(StructuredResult(
                test_name=name,
                value=value_str,
                unit=unit,
                ref_min=ref_min,
                ref_max=ref_max,
                status=status
            ))
            continue

        # Fallback parsing: detect known test names even if regex fails
        for key, (fallback_min, fallback_max) in FALLBACK_RANGES.items():
            if key in low_ln:
                num_m = NUM_RE.search(low_ln)
                if not num_m:
                    break
                value_str = num_m.group(0)
                unit_m = re.search(r"[-+]?\d*\.?\d+(?:,\d{3})?\s*([A-Za-z/%^0-9\-\._]+)", ln)
                unit = _clean_unit_text(unit_m.group(1)) if unit_m else ""
                status = _status_from_range(value_str, fallback_min, fallback_max)
                results.append(StructuredResult(
                    test_name=key.title(),
                    value=value_str,
                    unit=unit,
                    ref_min=fallback_min,
                    ref_max=fallback_max,
                    status=status
                ))
                break

    return results
