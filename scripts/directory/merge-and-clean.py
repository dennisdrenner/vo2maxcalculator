#!/usr/bin/env python3
"""
Merge all VO2 max facility data sources, deduplicate, export CSV,
and classify with Claude API.

Sources:
1. Outscraper Google Maps results (outscraper-results.json)
2. Company website scrapes (company-scrape-results.json)
3. Fitnescity seed data (seed-fitnescity-v2.json)
4. VO2 Master seed data (seed-vo2master.json)

Pipeline:
  Load all sources → normalize → dedupe → export raw CSV →
  classify with Claude API → export cleaned CSV
"""
import csv
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

# State abbreviation mapping
STATE_ABBREV = {
    "alabama": "AL", "alaska": "AK", "arizona": "AZ", "arkansas": "AR",
    "california": "CA", "colorado": "CO", "connecticut": "CT", "delaware": "DE",
    "district of columbia": "DC", "florida": "FL", "georgia": "GA", "hawaii": "HI",
    "idaho": "ID", "illinois": "IL", "indiana": "IN", "iowa": "IA",
    "kansas": "KS", "kentucky": "KY", "louisiana": "LA", "maine": "ME",
    "maryland": "MD", "massachusetts": "MA", "michigan": "MI", "minnesota": "MN",
    "mississippi": "MS", "missouri": "MO", "montana": "MT", "nebraska": "NE",
    "nevada": "NV", "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM",
    "new york": "NY", "north carolina": "NC", "north dakota": "ND", "ohio": "OH",
    "oklahoma": "OK", "oregon": "OR", "pennsylvania": "PA", "rhode island": "RI",
    "south carolina": "SC", "south dakota": "SD", "tennessee": "TN", "texas": "TX",
    "utah": "UT", "vermont": "VT", "virginia": "VA", "washington": "WA",
    "west virginia": "WV", "wisconsin": "WI", "wyoming": "WY",
}


def normalize_state(state_str):
    """Convert state name/code to 2-letter abbreviation."""
    if not state_str:
        return ""
    s = state_str.strip()
    if len(s) == 2:
        return s.upper()
    return STATE_ABBREV.get(s.lower(), s)


def normalize_phone(phone_str):
    """Normalize phone number to digits only."""
    if not phone_str:
        return ""
    digits = re.sub(r"[^\d]", "", phone_str)
    # Strip leading 1 for US numbers
    if len(digits) == 11 and digits.startswith("1"):
        digits = digits[1:]
    return digits


def clean_website(url):
    """Clean up website URL."""
    if not url:
        return ""
    # Decode URL-encoded characters
    url = urllib.request.unquote(url)
    # Remove tracking params
    url = re.sub(r'\?utm_.*$', '', url)
    return url


# ============================================================
# Loaders
# ============================================================

def load_outscraper():
    """Load and normalize Outscraper results (original + expanded)."""
    raw = []
    for filename in ("outscraper-results.json", "outscraper-results-expanded.json"):
        path = SCRIPT_DIR / filename
        if path.exists():
            data = json.loads(path.read_text())
            raw.extend(data)
            print(f"  [outscraper] Loaded {len(data)} from {filename}")
        else:
            print(f"  [outscraper] {filename} not found, skipping.")
    if not raw:
        return []
    facilities = []
    for item in raw:
        facilities.append({
            "name": item.get("name", ""),
            "city": item.get("city", ""),
            "state": normalize_state(item.get("state_code") or item.get("state", "")),
            "address": item.get("address", ""),
            "street": item.get("street", ""),
            "phone": normalize_phone(item.get("phone", "")),
            "website": clean_website(item.get("website", "")),
            "rating": item.get("rating"),
            "reviews_count": item.get("reviews"),
            "category": item.get("category", ""),
            "subtypes": item.get("subtypes", ""),
            "description": item.get("description", ""),
            "latitude": item.get("latitude"),
            "longitude": item.get("longitude"),
            "postal_code": item.get("postal_code", ""),
            "place_id": item.get("place_id", ""),
            "source": "outscraper",
            "query": item.get("query", ""),
            # Enrichment fields
            "photo": item.get("photo", ""),
            "logo": item.get("logo", ""),
            "reviews_per_score": item.get("reviews_per_score"),
            "reviews_link": item.get("reviews_link", ""),
            "working_hours": item.get("working_hours"),
            "booking_link": clean_website(item.get("booking_appointment_link", "")),
            "maps_link": item.get("location_link", ""),
            "verified": item.get("verified", False),
        })
    return facilities


def load_company_scrapes():
    """Load company website scrape results."""
    path = SCRIPT_DIR / "company-scrape-results.json"
    if not path.exists():
        print("  [company] No file found, skipping.")
        return []
    raw = json.loads(path.read_text())
    for item in raw:
        item["phone"] = normalize_phone(item.get("phone", ""))
        item["website"] = clean_website(item.get("website", ""))
    return raw


def load_fitnescity():
    """Load Fitnescity seed data."""
    path = SCRIPT_DIR / "seed-fitnescity-v2.json"
    if not path.exists():
        path = SCRIPT_DIR / "seed-fitnescity.json"
    if not path.exists():
        print("  [fitnescity] No file found, skipping.")
        return []
    data = json.loads(path.read_text())
    facilities = data.get("facilities", [])
    for f in facilities:
        f["phone"] = normalize_phone(f.get("phone", ""))
        f["source"] = "fitnescity"
    return facilities


def load_vo2master():
    """Load VO2 Master seed data."""
    path = SCRIPT_DIR / "seed-vo2master.json"
    if not path.exists():
        print("  [vo2master] No file found, skipping.")
        return []
    raw = json.loads(path.read_text())
    for item in raw:
        item["phone"] = normalize_phone(item.get("phone", ""))
        item["website"] = clean_website(item.get("website", ""))
        item.setdefault("source", "vo2master")
    return raw


# ============================================================
# Deduplication
# ============================================================

def make_dedup_key(f):
    """Create a normalized dedup key from name + city + state."""
    name = re.sub(r"[^a-z0-9]", "", (f.get("name") or "").lower())
    city = re.sub(r"[^a-z0-9]", "", (f.get("city") or "").lower())
    state = normalize_state(f.get("state", "")).lower()
    return f"{name}|{city}|{state}"


def make_phone_key(f):
    """Create a dedup key from phone number."""
    phone = f.get("phone", "")
    if phone and len(phone) == 10:
        return phone
    return None


def make_address_key(f):
    """Create a dedup key from address + city."""
    addr = re.sub(r"[^a-z0-9]", "", (f.get("address") or f.get("street") or "").lower())
    city = re.sub(r"[^a-z0-9]", "", (f.get("city") or "").lower())
    if addr and city:
        return f"{addr}|{city}"
    return None


def deduplicate(facilities):
    """Deduplicate using multiple keys: name+city+state, phone, address+city."""
    seen_name = {}
    seen_phone = set()
    seen_addr = set()
    deduped = []

    for f in facilities:
        # Skip entries with no name AND no address
        if not f.get("name") and not f.get("address") and not f.get("street"):
            continue

        name_key = make_dedup_key(f)
        phone_key = make_phone_key(f)
        addr_key = make_address_key(f)

        is_dup = False

        # Check name match (skip if name is empty)
        if name_key and "|" not in name_key[:1] and name_key in seen_name:
            # Merge missing fields into existing
            existing = seen_name[name_key]
            for field in ("address", "phone", "website", "rating", "reviews_count",
                          "latitude", "longitude", "postal_code", "category",
                          "photo", "reviews_per_score", "reviews_link",
                          "working_hours", "booking_link", "maps_link",
                          "verified", "place_id", "subtypes"):
                if not existing.get(field) and f.get(field):
                    existing[field] = f[field]
            is_dup = True

        # Check phone match
        if not is_dup and phone_key and phone_key in seen_phone:
            is_dup = True

        # Check address match
        if not is_dup and addr_key and addr_key in seen_addr:
            is_dup = True

        if is_dup:
            continue

        # Record keys
        if name_key and f.get("name"):
            seen_name[name_key] = f
        if phone_key:
            seen_phone.add(phone_key)
        if addr_key:
            seen_addr.add(addr_key)
        deduped.append(f)

    return deduped


# ============================================================
# CSV export
# ============================================================

CSV_COLUMNS = [
    "name", "city", "state", "address", "phone", "website",
    "rating", "reviews_count", "category", "subtypes",
    "latitude", "longitude", "postal_code", "source",
    "confirmed", "confidence", "place_id",
    "photo", "reviews_link", "booking_link", "maps_link", "verified",
]


def export_csv(facilities, filename):
    """Export facilities to CSV."""
    path = SCRIPT_DIR / filename
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_COLUMNS, extrasaction="ignore")
        writer.writeheader()
        for fac in facilities:
            writer.writerow(fac)
    print(f"  Exported {len(facilities)} rows to {path}")
    return path


# ============================================================
# Claude API classification
# ============================================================

def classify_with_claude(facilities, batch_size=30):
    """Use Claude API to classify whether facilities offer VO2 max testing."""
    if not ANTHROPIC_API_KEY:
        print("\n  [classify] No ANTHROPIC_API_KEY set. Skipping classification.")
        print("  [classify] Set ANTHROPIC_API_KEY env var and re-run to classify.")
        for f in facilities:
            f.setdefault("confirmed", None)
            f.setdefault("confidence", "")
        return facilities

    # Only classify facilities that haven't been classified
    to_classify = [f for f in facilities if f.get("confirmed") is None]
    already_done = len(facilities) - len(to_classify)

    if not to_classify:
        print("\n  [classify] All facilities already classified.")
        return facilities

    print(f"\n  [classify] Classifying {len(to_classify)} facilities with Claude API...")
    print(f"  [classify] {already_done} already classified, skipping those.")

    classified_count = 0
    for i in range(0, len(to_classify), batch_size):
        batch = to_classify[i:i + batch_size]
        batch_num = i // batch_size + 1
        total_batches = (len(to_classify) + batch_size - 1) // batch_size

        items_text = "\n".join(
            f"{j+1}. Name: {f.get('name', 'unknown')} | "
            f"City: {f.get('city', '?')}, {f.get('state', '?')} | "
            f"Category: {f.get('category', '')} | "
            f"Subtypes: {f.get('subtypes', '')} | "
            f"Website: {f.get('website', '')[:80]}"
            for j, f in enumerate(batch)
        )

        prompt = f"""You are classifying businesses to determine if they offer VO2 max lab testing or CPET (cardiopulmonary exercise testing) with a metabolic cart/mask.

For each facility below, respond with ONLY a JSON array of objects with "index" (1-based), "confirmed" (true/false), and "confidence" ("high"/"medium"/"low").

Mark TRUE if the facility likely offers:
- VO2 max testing with a metabolic cart (mask that measures gas exchange)
- CPET / cardiopulmonary exercise testing
- Metabolic testing with direct oxygen measurement (not just calorie counting)
- Sports performance lab testing with metabolic analysis
- RMR/metabolic rate testing (these facilities often also offer VO2 max)

Mark FALSE if the facility is:
- A regular gym, CrossFit box, or fitness studio without lab equipment
- A physical therapy clinic without metabolic testing
- A doctor's office or hospital without exercise testing
- A nutrition/diet counseling service
- A personal training studio
- A supplement or equipment retailer
- A chiropractic office
- A massage or spa business

Facilities:
{items_text}

Respond with ONLY the JSON array, no other text."""

        try:
            req_data = json.dumps({
                "model": "claude-sonnet-4-20250514",
                "max_tokens": 2048,
                "messages": [{"role": "user", "content": prompt}],
            }).encode()

            req = urllib.request.Request(
                "https://api.anthropic.com/v1/messages",
                method="POST",
                headers={
                    "Content-Type": "application/json",
                    "x-api-key": ANTHROPIC_API_KEY,
                    "anthropic-version": "2023-06-01",
                },
                data=req_data,
            )
            with urllib.request.urlopen(req, timeout=60) as r:
                resp = json.loads(r.read().decode())

            text = resp["content"][0]["text"]
            match = re.search(r"\[.*\]", text, re.DOTALL)
            if match:
                results = json.loads(match.group())
                for result in results:
                    idx = result["index"] - 1
                    if 0 <= idx < len(batch):
                        batch[idx]["confirmed"] = result["confirmed"]
                        batch[idx]["confidence"] = result.get("confidence", "medium")
                        classified_count += 1

                confirmed_in_batch = sum(1 for r in results if r.get("confirmed"))
                print(f"    Batch {batch_num}/{total_batches}: "
                      f"{confirmed_in_batch}/{len(results)} confirmed")
            else:
                print(f"    Batch {batch_num}/{total_batches}: WARN could not parse response")

        except Exception as e:
            print(f"    Batch {batch_num}/{total_batches}: ERROR {e}")

        time.sleep(1)

    print(f"\n  [classify] Classified {classified_count} facilities total.")
    confirmed = sum(1 for f in facilities if f.get("confirmed") is True)
    rejected = sum(1 for f in facilities if f.get("confirmed") is False)
    unknown = sum(1 for f in facilities if f.get("confirmed") is None)
    print(f"  [classify] Confirmed: {confirmed}, Rejected: {rejected}, Unknown: {unknown}")

    return facilities


# ============================================================
# Directory JSON generation
# ============================================================

def generate_directory_json(confirmed):
    """Generate enriched directory-data.json for the website."""
    states = {}
    for f in confirmed:
        st = f.get("state", "")
        if not st:
            continue
        if st not in states:
            states[st] = []

        reviews = None
        if f.get("reviews_count"):
            try:
                reviews = int(float(f["reviews_count"]))
            except (ValueError, TypeError):
                pass

        rating = None
        if f.get("rating"):
            try:
                rating = float(f["rating"])
            except (ValueError, TypeError):
                pass

        entry = {
            "name": f.get("name", ""),
            "city": f.get("city", ""),
            "state": st,
            "address": f.get("address", ""),
            "phone": f.get("phone", ""),
            "website": f.get("website", ""),
            "source": f.get("source", ""),
            "rating": rating,
            "reviews_count": reviews,
            "latitude": f.get("latitude"),
            "longitude": f.get("longitude"),
            # Enrichment fields
            "place_id": f.get("place_id", ""),
            "photo": f.get("photo", ""),
            "subtypes": f.get("subtypes", ""),
            "reviews_per_score": f.get("reviews_per_score"),
            "reviews_link": f.get("reviews_link", ""),
            "working_hours": f.get("working_hours"),
            "booking_link": f.get("booking_link", ""),
            "maps_link": f.get("maps_link", ""),
            "verified": bool(f.get("verified")),
        }
        states[st].append(entry)

    # Sort facilities within each state by city
    for st in states:
        states[st].sort(key=lambda x: x["city"])

    output = {
        "generated": time.strftime("%Y-%m-%d"),
        "total_facilities": sum(len(v) for v in states.values()),
        "total_states": len(states),
        "states": dict(sorted(states.items())),
    }

    out_path = SCRIPT_DIR.parent.parent / "lib" / "directory-data.json"
    out_path.write_text(json.dumps(output, indent=2))
    size_kb = out_path.stat().st_size / 1024
    print(f"  Wrote {output['total_facilities']} facilities across "
          f"{output['total_states']} states to {out_path} ({size_kb:.0f} KB)")


# ============================================================
# Main
# ============================================================

def main():
    print("=== VO2 Max Facility Data Merge & Clean ===\n")

    # 1. Load all sources
    print("[1/5] Loading data sources...")
    outscraper = load_outscraper()
    print(f"  Outscraper:  {len(outscraper)}")

    company = load_company_scrapes()
    print(f"  Companies:   {len(company)}")

    fitnescity = load_fitnescity()
    print(f"  Fitnescity:  {len(fitnescity)}")

    vo2master = load_vo2master()
    print(f"  VO2 Master:  {len(vo2master)}")

    # Pre-mark seed data as confirmed
    for f in fitnescity:
        f["confirmed"] = True
        f["confidence"] = "high"
    for f in vo2master:
        f["confirmed"] = True
        f["confidence"] = "high"

    # Combine: seed data first (higher priority in dedup merging)
    all_facilities = vo2master + fitnescity + company + outscraper
    print(f"\n  Total raw: {len(all_facilities)}")

    # 2. Deduplicate
    print("\n[2/5] Deduplicating...")
    deduped = deduplicate(all_facilities)
    print(f"  After dedup: {len(deduped)} unique facilities")

    # 3. Export raw CSV (before classification)
    print("\n[3/6] Exporting raw CSV...")
    export_csv(deduped, "all-facilities-raw.csv")

    # 3.5. Load previous classifications to avoid re-classifying
    prev_csv = SCRIPT_DIR / "all-facilities-classified.csv"
    if prev_csv.exists():
        print("\n  Loading previous classifications...")
        with open(prev_csv) as pf:
            prev_rows = list(csv.DictReader(pf))
        prev_map = {}
        for pr in prev_rows:
            key = f"{pr.get('name', '').lower().strip()}|{pr.get('city', '').lower().strip()}|{pr.get('state', '').strip()}"
            if pr.get("confirmed") in ("True", "False"):
                prev_map[key] = pr["confirmed"] == "True"
        matched = 0
        for f in deduped:
            key = f"{(f.get('name') or '').lower().strip()}|{(f.get('city') or '').lower().strip()}|{(f.get('state') or '').strip()}"
            if key in prev_map:
                f["confirmed"] = prev_map[key]
                f["confidence"] = "high"
                matched += 1
        print(f"  Reused {matched} previous classifications.")

    # 4. Classify with Claude API (only unclassified entries)
    print("\n[4/6] Classifying with Claude API...")
    classified = classify_with_claude(deduped)

    # 5. Export cleaned CSV
    print("\n[5/6] Exporting cleaned CSV...")
    confirmed = [f for f in classified if f.get("confirmed") is True]
    export_csv(classified, "all-facilities-classified.csv")
    export_csv(confirmed, "confirmed-facilities.csv")

    # 6. Generate enriched directory-data.json
    print("\n[6/6] Generating enriched directory-data.json...")
    generate_directory_json(confirmed)

    # Stats
    print(f"\n=== Done! ===")
    print(f"  Total unique:     {len(deduped)}")
    print(f"  Confirmed VO2:    {len(confirmed)}")
    print(f"  Rejected:         {sum(1 for f in classified if f.get('confirmed') is False)}")
    print(f"  Unclassified:     {sum(1 for f in classified if f.get('confirmed') is None)}")

    # State breakdown of confirmed
    states = {}
    for f in confirmed:
        st = f.get("state", "??")
        states[st] = states.get(st, 0) + 1
    print(f"\n  Confirmed by state ({len(states)} states):")
    for st in sorted(states.keys()):
        print(f"    {st}: {states[st]}")


if __name__ == "__main__":
    main()
