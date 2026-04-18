#!/usr/bin/env python3
"""
Fetch VO2 max testing facilities from Google Maps via Outscraper API.

Runs 6 search queries across 50 US metros, saves raw results to outscraper-results.json.
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
    "VO2 max testing",
    "metabolic testing lab",
    "CPET cardiopulmonary exercise testing",
    "exercise physiology lab",
    "sports performance testing",
    "fitness metabolic assessment",
]

METROS = [
    "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX",
    "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA",
    "Dallas, TX", "Austin, TX", "Jacksonville, FL", "San Jose, CA",
    "Fort Worth, TX", "Columbus, OH", "Charlotte, NC", "Indianapolis, IN",
    "San Francisco, CA", "Seattle, WA", "Denver, CO", "Nashville, TN",
    "Oklahoma City, OK", "Washington, DC", "El Paso, TX", "Las Vegas, NV",
    "Boston, MA", "Portland, OR", "Memphis, TN", "Louisville, KY",
    "Baltimore, MD", "Milwaukee, WI", "Albuquerque, NM", "Tucson, AZ",
    "Fresno, CA", "Mesa, AZ", "Sacramento, CA", "Atlanta, GA",
    "Kansas City, MO", "Omaha, NE", "Colorado Springs, CO", "Raleigh, NC",
    "Long Beach, CA", "Virginia Beach, VA", "Miami, FL", "Minneapolis, MN",
    "Tampa, FL", "New Orleans, LA", "Cleveland, OH", "Orlando, FL",
    "Pittsburgh, PA", "St. Louis, MO",
]

LIMIT_PER_QUERY = 20


def build_query_strings():
    """Build 'query, metro' strings for Outscraper."""
    queries = []
    for q in QUERIES:
        for metro in METROS:
            queries.append(f"{q}, {metro}")
    return queries


def fetch_batch(client, batch, batch_num, total_batches):
    """Fetch a batch of queries from Outscraper."""
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
    """Flatten nested Outscraper results into a flat list of places."""
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
        print("  export OUTSCRAPER_API_KEY='your-key-here'")
        sys.exit(1)

    client = ApiClient(api_key=API_KEY)

    all_queries = build_query_strings()
    print(f"=== Outscraper Google Maps Fetch ===")
    print(f"  {len(QUERIES)} search terms x {len(METROS)} metros = {len(all_queries)} queries")
    print(f"  Limit: {LIMIT_PER_QUERY} results per query")
    print()

    # Batch queries to avoid overwhelming the API
    # Outscraper handles batches well, but let's do 25 at a time
    BATCH_SIZE = 25
    all_raw = []

    total_batches = (len(all_queries) + BATCH_SIZE - 1) // BATCH_SIZE
    for i in range(0, len(all_queries), BATCH_SIZE):
        batch = all_queries[i:i + BATCH_SIZE]
        batch_num = i // BATCH_SIZE + 1
        results = fetch_batch(client, batch, batch_num, total_batches)
        if results:
            all_raw.extend(results)
        # Brief pause between batches
        if i + BATCH_SIZE < len(all_queries):
            time.sleep(2)

    print(f"\n  Raw result sets: {len(all_raw)}")

    # Flatten and dedupe by place_id
    places = flatten_results(all_raw)
    print(f"  Unique places after dedup: {len(places)}")

    # Save raw results
    out_path = SCRIPT_DIR / "outscraper-results.json"
    out_path.write_text(json.dumps(places, indent=2, default=str))
    print(f"\n  Saved to {out_path}")

    # Quick stats
    states = {}
    for p in places:
        st = p.get("state", p.get("us_state", "unknown"))
        states[st] = states.get(st, 0) + 1
    print(f"\n  States represented: {len(states)}")
    for st in sorted(states.keys()):
        print(f"    {st}: {states[st]}")


if __name__ == "__main__":
    main()
