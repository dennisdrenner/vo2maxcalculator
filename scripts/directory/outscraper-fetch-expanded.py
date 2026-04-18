#!/usr/bin/env python3
"""
Expanded Outscraper fetch — targets underrepresented states, college towns,
and mid-size cities with additional search queries.

Saves to outscraper-results-expanded.json (does NOT overwrite the original).
"""
import json
import os
import sys
import time
from pathlib import Path
from outscraper import ApiClient

SCRIPT_DIR = Path(__file__).parent
API_KEY = os.environ.get("OUTSCRAPER_API_KEY", "")

QUERIES = [
    # Original 6
    "VO2 max testing",
    "metabolic testing lab",
    "CPET cardiopulmonary exercise testing",
    "exercise physiology lab",
    "sports performance testing",
    "fitness metabolic assessment",
    # New 6
    "VO2 max test near me",
    "metabolic cart testing",
    "exercise stress test lab",
    "cardiopulmonary exercise test",
    "resting metabolic rate testing",
    "DEXA scan VO2 max",
]

METROS = [
    # Tier 1: Uncovered states
    "Anchorage, AK", "Birmingham, AL", "Little Rock, AR", "Wilmington, DE",
    "Honolulu, HI", "Des Moines, IA", "Portland, ME", "Jackson, MS",
    "Fargo, ND", "Manchester, NH", "Providence, RI", "Charleston, SC",
    "Sioux Falls, SD", "Burlington, VT", "Charleston, WV", "Cheyenne, WY",

    # Tier 2: Underrepresented states
    "Boise, ID", "Ann Arbor, MI", "Grand Rapids, MI", "Detroit, MI",
    "Salt Lake City, UT", "Provo, UT", "Billings, MT", "St. Paul, MN",
    "Rochester, MN", "Newark, NJ", "Princeton, NJ", "Hartford, CT",
    "New Haven, CT",

    # Tier 3: College towns with exercise science programs
    "Chapel Hill, NC", "Eugene, OR", "Gainesville, FL", "State College, PA",
    "Bloomington, IN", "Boulder, CO", "Champaign, IL", "Madison, WI",
    "Knoxville, TN", "Tempe, AZ", "Tuscaloosa, AL", "Columbia, MO",
    "Tallahassee, FL", "Amherst, MA", "Laramie, WY", "Ithaca, NY",
    "Charlottesville, VA", "Athens, GA", "Davis, CA", "Corvallis, OR",
    "Baton Rouge, LA",

    # Tier 4: Mid-size cities in strong states
    "Bakersfield, CA", "Riverside, CA", "Oakland, CA", "Naples, FL",
    "Fort Myers, FL", "Savannah, GA", "Lexington, KY", "Asheville, NC",
    "Akron, OH", "Tulsa, OK", "Chattanooga, TN", "Spokane, WA",
    "Richmond, VA", "Norfolk, VA",
]

LIMIT_PER_QUERY = 20


def build_query_strings():
    queries = []
    for q in QUERIES:
        for metro in METROS:
            queries.append(f"{q}, {metro}")
    return queries


def fetch_batch(client, batch, batch_num, total_batches):
    print(f"  Batch {batch_num}/{total_batches} ({len(batch)} queries)...")
    try:
        results = client.google_maps_search(
            batch,
            limit=LIMIT_PER_QUERY,
            language="en",
            region="us",
        )
        return results
    except Exception as e:
        print(f"  ERROR on batch {batch_num}: {e}")
        return []


def flatten_results(raw_results):
    places = []
    seen_place_ids = set()
    for query_results in raw_results:
        if not isinstance(query_results, list):
            continue
        for place in query_results:
            if not isinstance(place, dict):
                continue
            pid = place.get("place_id", "")
            if pid and pid in seen_place_ids:
                continue
            if pid:
                seen_place_ids.add(pid)
            places.append(place)
    return places


def main():
    if not API_KEY:
        print("ERROR: Set OUTSCRAPER_API_KEY environment variable.")
        sys.exit(1)

    client = ApiClient(api_key=API_KEY)

    all_queries = build_query_strings()
    print(f"=== Outscraper Expanded Fetch ===")
    print(f"  {len(QUERIES)} search terms x {len(METROS)} metros = {len(all_queries)} queries")
    print(f"  Limit: {LIMIT_PER_QUERY} results per query")
    print()

    BATCH_SIZE = 25
    all_raw = []
    total_batches = (len(all_queries) + BATCH_SIZE - 1) // BATCH_SIZE

    for i in range(0, len(all_queries), BATCH_SIZE):
        batch = all_queries[i:i + BATCH_SIZE]
        batch_num = i // BATCH_SIZE + 1
        results = fetch_batch(client, batch, batch_num, total_batches)
        if results:
            all_raw.extend(results)
        if i + BATCH_SIZE < len(all_queries):
            time.sleep(2)

    print(f"\n  Raw result sets: {len(all_raw)}")

    places = flatten_results(all_raw)
    print(f"  Unique places after dedup: {len(places)}")

    out_path = SCRIPT_DIR / "outscraper-results-expanded.json"
    out_path.write_text(json.dumps(places, indent=2, default=str))
    print(f"\n  Saved to {out_path}")

    states = {}
    for p in places:
        st = p.get("state", p.get("us_state", "unknown"))
        states[st] = states.get(st, 0) + 1
    print(f"\n  States represented: {len(states)}")
    for st in sorted(states.keys()):
        print(f"    {st}: {states[st]}")


if __name__ == "__main__":
    main()
