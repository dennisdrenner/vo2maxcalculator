#!/usr/bin/env python3
"""
Process and classify VO2 max testing facility data.

Pipeline:
1. Load seed data (Fitnescity, VO2 Master)
2. Load Outscraper Google Maps results (if available)
3. Deduplicate by name + city + state
4. Classify each facility with Claude API (is this a real VO2 max lab?)
5. Output cleaned JSON for the website
"""
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

def load_seed_fitnescity():
    """Load Fitnescity seed data (state/city pairs, no full addresses yet)."""
    path = SCRIPT_DIR / "seed-fitnescity.json"
    if not path.exists():
        return []
    data = json.loads(path.read_text())
    facilities = []
    for entry in data["states"]:
        state = entry["state"]
        for city in entry["cities"]:
            facilities.append({
                "name": "",
                "city": city,
                "state": state,
                "address": "",
                "phone": "",
                "website": "",
                "source": "fitnescity",
                "source_url": f"https://www.fitnescity.com/vo2-max-test-in-{city.lower().replace(' ', '-')}-{state.lower()}",
                "confirmed": True,
            })
    return facilities


def load_seed_vo2master():
    """Load VO2 Master seed data (full facility details)."""
    path = SCRIPT_DIR / "seed-vo2master.json"
    if not path.exists():
        return []
    data = json.loads(path.read_text())
    for d in data:
        d["confirmed"] = True
        d["website"] = ""
        d["source_url"] = "https://vo2master.com/testing-facilities/"
    return data


def load_outscraper():
    """Load Outscraper Google Maps results if available."""
    path = SCRIPT_DIR / "outscraper-results.json"
    if not path.exists():
        print("[process] No outscraper-results.json found, skipping.")
        return []
    raw = json.loads(path.read_text())
    facilities = []
    for item in raw:
        facilities.append({
            "name": item.get("name", ""),
            "city": item.get("city", ""),
            "state": item.get("state", ""),
            "address": item.get("full_address", item.get("address", "")),
            "phone": item.get("phone", ""),
            "website": item.get("website", item.get("site", "")),
            "rating": item.get("rating"),
            "reviews_count": item.get("reviews", item.get("reviews_count")),
            "category": item.get("category", ""),
            "description": item.get("description", ""),
            "latitude": item.get("latitude"),
            "longitude": item.get("longitude"),
            "source": "outscraper",
            "confirmed": None,
        })
    return facilities


def normalize_key(name, city, state):
    """Create a normalized dedup key."""
    n = re.sub(r"[^a-z0-9]", "", (name or "").lower())
    c = re.sub(r"[^a-z0-9]", "", (city or "").lower())
    s = re.sub(r"[^a-z]", "", (state or "").lower())[:2]
    return f"{n}|{c}|{s}"


def deduplicate(facilities):
    """Deduplicate facilities by normalized name+city+state."""
    seen = {}
    deduped = []
    for f in facilities:
        key = normalize_key(f.get("name", ""), f["city"], f["state"])
        if not key or key in seen:
            if key and key in seen:
                existing = seen[key]
                if not existing.get("name") and f.get("name"):
                    existing["name"] = f["name"]
                if not existing.get("address") and f.get("address"):
                    existing["address"] = f["address"]
                if not existing.get("website") and f.get("website"):
                    existing["website"] = f["website"]
                if not existing.get("phone") and f.get("phone"):
                    existing["phone"] = f["phone"]
            continue
        seen[key] = f
        deduped.append(f)
    return deduped


def classify_batch_claude(facilities, batch_size=20):
    """Use Claude API to classify whether facilities actually offer VO2 max testing."""
    if not ANTHROPIC_API_KEY:
        print("[classify] No ANTHROPIC_API_KEY set. Skipping classification.")
        print("[classify] Set ANTHROPIC_API_KEY env var and re-run to classify.")
        return facilities

    unclassified = [f for f in facilities if f.get("confirmed") is None]
    if not unclassified:
        print("[classify] All facilities already classified.")
        return facilities

    print(f"[classify] Classifying {len(unclassified)} facilities with Claude API...")

    for i in range(0, len(unclassified), batch_size):
        batch = unclassified[i:i + batch_size]
        items_text = "\n".join(
            f"{j+1}. Name: {f.get('name', 'unknown')} | City: {f['city']}, {f['state']} | "
            f"Category: {f.get('category', '')} | Description: {f.get('description', '')[:200]}"
            for j, f in enumerate(batch)
        )

        prompt = f"""You are classifying businesses to determine if they offer VO2 max lab testing or CPET (cardiopulmonary exercise testing) with a metabolic cart/mask.

For each facility below, respond with ONLY a JSON array of objects with "index" (1-based) and "confirmed" (true/false) and "confidence" ("high"/"medium"/"low").

Mark TRUE if the facility likely offers:
- VO2 max testing with a metabolic cart (mask that measures gas exchange)
- CPET / cardiopulmonary exercise testing
- Metabolic testing with direct oxygen measurement
- Sports performance lab testing

Mark FALSE if the facility is:
- A regular gym or fitness studio without lab equipment
- A physical therapy clinic without metabolic testing
- A doctor's office without exercise testing equipment
- A nutrition/diet counseling service
- A personal training studio

Facilities:
{items_text}

Respond with ONLY the JSON array, no other text."""

        try:
            req_data = json.dumps({
                "model": "claude-sonnet-4-20250514",
                "max_tokens": 1024,
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
                        batch[idx]["classification_confidence"] = result.get("confidence", "medium")
                print(f"  Classified batch {i//batch_size + 1}: {len(results)} facilities")
            else:
                print(f"  WARNING: Could not parse batch {i//batch_size + 1} response")

        except Exception as e:
            print(f"  ERROR classifying batch {i//batch_size + 1}: {e}")

        time.sleep(1)

    return facilities


def generate_output(facilities):
    """Generate the final cleaned JSON for the website."""
    confirmed = [f for f in facilities if f.get("confirmed") is True]

    states = {}
    for f in confirmed:
        st = f["state"]
        if st not in states:
            states[st] = []
        states[st].append({
            "name": f.get("name", ""),
            "city": f["city"],
            "state": f["state"],
            "address": f.get("address", ""),
            "phone": f.get("phone", ""),
            "website": f.get("website", ""),
            "source": f.get("source", ""),
            "rating": f.get("rating"),
            "reviews_count": f.get("reviews_count"),
            "latitude": f.get("latitude"),
            "longitude": f.get("longitude"),
        })

    for st in states:
        states[st].sort(key=lambda x: x["city"])

    output = {
        "generated": time.strftime("%Y-%m-%d"),
        "total_facilities": len(confirmed),
        "total_states": len(states),
        "states": dict(sorted(states.items())),
    }

    out_path = SCRIPT_DIR.parent.parent / "lib" / "directory-data.json"
    out_path.write_text(json.dumps(output, indent=2))
    print(f"\n[output] Wrote {len(confirmed)} confirmed facilities across {len(states)} states to {out_path}")

    raw_path = SCRIPT_DIR / "all-facilities-raw.json"
    raw_path.write_text(json.dumps(facilities, indent=2))
    print(f"[output] Wrote {len(facilities)} total facilities (including unconfirmed) to {raw_path}")

    return output


def main():
    print("=== VO2 Max Testing Directory Pipeline ===\n")

    print("[1/5] Loading seed data...")
    fitnescity = load_seed_fitnescity()
    print(f"  Fitnescity: {len(fitnescity)} locations")
    vo2master = load_seed_vo2master()
    print(f"  VO2 Master: {len(vo2master)} locations")

    print("\n[2/5] Loading Outscraper data...")
    outscraper = load_outscraper()
    print(f"  Outscraper: {len(outscraper)} locations")

    all_facilities = fitnescity + vo2master + outscraper
    print(f"\n  Total raw: {len(all_facilities)}")

    print("\n[3/5] Deduplicating...")
    deduped = deduplicate(all_facilities)
    print(f"  After dedup: {len(deduped)} unique facilities")

    print("\n[4/5] Classifying with Claude API...")
    classified = classify_batch_claude(deduped)

    print("\n[5/5] Generating output...")
    output = generate_output(classified)

    print(f"\n=== Done! ===")
    print(f"  Confirmed facilities: {output['total_facilities']}")
    print(f"  States covered: {output['total_states']}")


if __name__ == "__main__":
    main()
