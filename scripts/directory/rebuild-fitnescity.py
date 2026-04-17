#!/usr/bin/env python3
"""Rebuild Fitnescity seed data using actual URL slugs from the scrape."""
import json
from pathlib import Path

# The actual scraped data from Fitnescity with real URL paths
SCRAPED = {
    "AL": [
        {"city": "Alabaster", "link": "/vo2-max-test-in-alabaster-al-brown-cir"},
        {"city": "Jacksonville", "link": "/vo2-max-test-in-jacksonville-al"},
        {"city": "Mobile", "link": "/vo2-max-test-in-mobile-al"},
        {"city": "Homewood", "link": "/vo2-max-test-in-homewood-al-w-oxmoor-rd"},
        {"city": "Town Creek", "link": "/vo2-max-test-in-town-creek-al"},
    ],
    "AK": [
        {"city": "Soldotna", "link": "/vo2-max-test-in-soldotna-ak-edgington-rd"},
        {"city": "Anchorage", "link": "/vo2-max-test-in-anchorage-ak"},
    ],
    "AZ": [
        {"city": "Chandler", "link": "/vo2-max-test-in-chandler-az-s-alma-school-rd"},
        {"city": "Flagstaff", "link": "/vo2-max-test-in-flagstaff-az-n-beaver-st"},
        {"city": "Carefree", "link": "/vo2-max-test-in-carefree-az-n-pima-rd"},
        {"city": "Scottsdale", "link": "/vo2-max-test-in-scottsdale-az"},
        {"city": "Phoenix", "link": "/vo2-max-test-in-phoenix-az-e-camelback-rd"},
        {"city": "Wickenburg", "link": "/vo2-max-test-in-wickenburg-az"},
        {"city": "Gilbert", "link": "/vo2-max-test-in-gilbert-az"},
        {"city": "Tucson", "link": "/vo2-max-test-in-tucson-az"},
    ],
    "AR": [
        {"city": "Benton", "link": "/vo2-max-test-in-benton-ar-hwy-35-n"},
        {"city": "Little Rock", "link": "/vo2-max-test-in-little-rock-ar"},
        {"city": "Springdale", "link": "/vo2-max-test-in-springdale-ar"},
    ],
    "CA": [
        {"city": "Venice", "link": "/vo2-max-test-in-venice-ca-main-st"},
        {"city": "Yorba Linda", "link": "/vo2-max-test-in-yorba-linda-ca-yorba-linda-blvd"},
        {"city": "Carlsbad", "link": "/vo2-max-test-in-carlsbad-ca"},
        {"city": "Solana Beach", "link": "/vo2-max-test-in-solano-beach-ca-s-highway-101"},
        {"city": "Woodland Hills", "link": "/vo2-max-test-in-woodland-hills-ca-ventura-blvd"},
        {"city": "Oakland", "link": "/vo2-max-test-in-oakland-ca-redwood-rd"},
        {"city": "Costa Mesa", "link": "/vo2-max-test-in-costa-mesa-ca-st-clair-st"},
        {"city": "La Jolla", "link": "/vo2-max-test-in-la-jolla-ca-gilman-drive"},
        {"city": "Davis", "link": "/vo2-max-test-in-davis-ca-spafford-st"},
        {"city": "Irvine", "link": "/vo2-max-test-in-irvine-ca"},
        {"city": "Thousand Oaks", "link": "/vo2-max-test-in-thousand-oaks-ca"},
        {"city": "Los Angeles", "link": "/vo2-max-test-in-los-angeles-ca"},
        {"city": "Fresno", "link": "/vo2-max-test-in-fresno-ca"},
        {"city": "Santa Cruz", "link": "/vo2-max-test-in-santa-cruz-ca"},
        {"city": "Culver City", "link": "/vo2-max-test-in-culver-city-ca"},
        {"city": "Redlands", "link": "/vo2-max-test-in-redlands-ca"},
        {"city": "San Diego", "link": "/vo2-max-test-in-san-diego-ca"},
        {"city": "San Francisco", "link": "/vo2-max-test-in-san-francisco-ca"},
        {"city": "Santa Barbara", "link": "/vo2-max-test-in-santa-barbara-ca"},
        {"city": "Santa Monica", "link": "/vo2-max-test-in-santa-monica-ca"},
        {"city": "Los Gatos", "link": "/vo2-max-test-in-los-gatos-ca-university-ave"},
        {"city": "Palm Desert", "link": "/vo2-max-test-in-palm-desert-ca"},
        {"city": "Glendale", "link": "/vo2-max-test-in-glendale-ca-n-central-ave"},
        {"city": "Long Beach", "link": "/vo2-max-test-in-long-beach-ca"},
        {"city": "Pacific Palisades", "link": "/vo2-max-test-in-pacific-palisades-ca"},
        {"city": "San Marcos", "link": "/vo2-max-test-in-san-marcos-ca"},
    ],
    "CO": [
        {"city": "Castle Rock", "link": "/vo2-max-test-in-castle-rock-co"},
        {"city": "Fort Collins", "link": "/vo2-max-test-in-fort-collins-co"},
        {"city": "Denver", "link": "/vo2-max-test-in-denver-co"},
        {"city": "Colorado Springs", "link": "/vo2-max-test-in-colorado-springs-co-corporate-drive"},
        {"city": "Boulder", "link": "/vo2-max-test-in-boulder-co-38th-street"},
        {"city": "Golden", "link": "/vo2-max-test-in-golden-co"},
        {"city": "Littleton", "link": "/vo2-max-test-in-littleton-co"},
    ],
    "CT": [
        {"city": "Milford", "link": "/vo2-max-test-in-bridgeport-ave-milford-ct"},
        {"city": "Fairfield", "link": "/vo2-max-test-in-fairfield-ct"},
        {"city": "Middletown", "link": "/vo2-max-test-in-middletown-ct"},
        {"city": "New Haven", "link": "/vo2-max-test-in-new-haven-ct"},
        {"city": "Westport", "link": "/vo2-max-test-in-westport-ct"},
        {"city": "Glastonbury", "link": "/vo2-max-test-in-glastonbury-ct"},
    ],
    "DC": [
        {"city": "Washington", "link": "/vo2-max-test-in-washington-dc-4th-st-ne"},
    ],
    "FL": [
        {"city": "Pinecrest", "link": "/vo2-max-test-in-pinecrest-fl-sw-136th-st"},
        {"city": "Lakeland", "link": "/vo2-max-test-in-lakeland-fl"},
        {"city": "Orlando", "link": "/vo2-max-test-in-orlando-fl"},
        {"city": "Coral Gables", "link": "/vo2-max-test-in-coral-gables-fl"},
        {"city": "Miami", "link": "/vo2-max-test-in-miami-fl"},
        {"city": "Sarasota", "link": "/vo2-max-test-in-sarasota-fl"},
        {"city": "Boca Raton", "link": "/vo2-max-test-in-boca-raton-fl"},
        {"city": "Melbourne", "link": "/vo2-max-test-in-melbourne-fl"},
        {"city": "Pensacola", "link": "/vo2-max-test-in-pensacola-fl"},
        {"city": "Tallahassee", "link": "/vo2-max-test-in-tallahassee-fl"},
        {"city": "Wesley Chapel", "link": "/vo2-max-test-in-wesley-chapel-fl"},
    ],
    "GA": [
        {"city": "Atlanta", "link": "/vo2-max-test-in-atlanta-ga"},
        {"city": "Peachtree City", "link": "/vo2-max-test-in-peachtree-city-ga"},
        {"city": "Alpharetta", "link": "/vo2-max-test-in-alpharetta-ga"},
        {"city": "Marietta", "link": "/vo2-max-test-in-marietta-ga"},
        {"city": "Roswell", "link": "/vo2-max-test-in-roswell-ga"},
        {"city": "Savannah", "link": "/vo2-max-test-in-savannah-ga"},
    ],
    "HI": [{"city": "Honolulu", "link": "/vo2-max-test-in-honolulu-hi"}],
    "ID": [
        {"city": "Boise", "link": "/vo2-max-test-in-boise-id"},
        {"city": "Twin Falls", "link": "/vo2-max-test-in-twin-falls-id"},
    ],
    "IL": [
        {"city": "Chicago", "link": "/vo2-max-test-in-chicago-il"},
        {"city": "Edwardsville", "link": "/vo2-max-test-in-edwardsville-il-center-grove-rd"},
        {"city": "Skokie", "link": "/vo2-max-test-in-skokie-il-w-touhy-ave"},
        {"city": "River Forest", "link": "/vo2-max-test-in-river-forest-il"},
        {"city": "Peoria", "link": "/vo2-max-test-in-peoria-il"},
    ],
    "IN": [
        {"city": "Elkhart", "link": "/vo2-max-test-in-elkhart-in"},
        {"city": "Evansville", "link": "/vo2-max-test-in-evansville-in"},
        {"city": "Carmel", "link": "/vo2-max-test-in-carmel-in-south-rangeline-road"},
        {"city": "Muncie", "link": "/vo2-max-test-in-muncie-in"},
        {"city": "Indianapolis", "link": "/vo2-max-test-in-indianapolis-in"},
    ],
    "IA": [
        {"city": "Des Moines", "link": "/vo2-max-test-in-des-moines-ia"},
        {"city": "Iowa City", "link": "/vo2-max-test-in-iowa-city-ia"},
    ],
    "KS": [
        {"city": "Overland Park", "link": "/vo2-max-test-in-overland-park-ks"},
        {"city": "Wichita", "link": "/vo2-max-test-in-wichita-ks"},
        {"city": "Merriam", "link": "/vo2-max-test-in-merriam-ks"},
    ],
    "KY": [
        {"city": "Louisville", "link": "/vo2-max-test-in-louisville-ky"},
        {"city": "Paducah", "link": "/vo2-max-test-in-paducah-ky"},
        {"city": "Bowling Green", "link": "/vo2-max-test-in-bowling-green-ky"},
    ],
    "LA": [
        {"city": "Shreveport", "link": "/vo2-max-test-in-shreveport-la"},
        {"city": "Lafayette", "link": "/vo2-max-test-in-lafayette-la"},
    ],
    "ME": [
        {"city": "Bangor", "link": "/vo2-max-test-in-bangor-me-essex-st"},
        {"city": "Scarborough", "link": "/vo2-max-test-in-scarborough-me-haigis-pkwy"},
    ],
    "MD": [
        {"city": "Jessup", "link": "/vo2-max-test-in-savage-md-bollman-place"},
        {"city": "Chevy Chase", "link": "/vo2-max-test-in-chevy-chase-md-connecticut-avenue"},
    ],
    "MA": [
        {"city": "Wellesley", "link": "/vo2-max-test-in-wellesley-ma-central-street"},
        {"city": "Boston", "link": "/vo2-max-test-in-boston-ma"},
        {"city": "Springfield", "link": "/vo2-max-test-in-springfield-ma"},
        {"city": "Cambridge", "link": "/vo2-max-test-in-cambridge-ma"},
        {"city": "Seekonk", "link": "/vo2-max-test-in-seekonk-ma"},
    ],
    "MI": [
        {"city": "Madison Heights", "link": "/vo2-max-test-in-detroit-mi"},
        {"city": "Traverse City", "link": "/vo2-max-test-in-traverse-city-mi"},
        {"city": "Ann Arbor", "link": "/vo2-max-test-in-ann-arbor-mi"},
        {"city": "Grand Rapids", "link": "/vo2-max-test-in-grand-rapids-mi"},
    ],
    "MN": [
        {"city": "Edina", "link": "/vo2-max-test-in-edina-mn-west-50th-street"},
        {"city": "Minneapolis", "link": "/vo2-max-test-in-center-minneapolis-mn"},
        {"city": "New Hope", "link": "/vo2-max-test-in-new-hope-mn"},
    ],
    "MS": [{"city": "Oxford", "link": "/vo2-max-test-in-oxford-ms"}],
    "MO": [
        {"city": "Columbia", "link": "/vo2-max-test-in-columbia-mo-s-keene-st"},
        {"city": "Springfield", "link": "/vo2-max-test-in-springfield-mo"},
        {"city": "St. Charles", "link": "/vo2-max-test-in-st-charles-mo"},
    ],
    "MT": [
        {"city": "Helena", "link": "/vo2-max-test-in-helena-mt-saddle-drive"},
        {"city": "Missoula", "link": "/vo2-max-test-in-missoula-mt"},
    ],
    "NE": [{"city": "Kearney", "link": "/vo2-max-test-in-kearney-ne"}],
    "NV": [{"city": "Las Vegas", "link": "/vo2-max-test-in-las-vegas-nv"}],
    "NH": [{"city": "Keene", "link": "/vo2-max-test-in-keene-nh"}],
    "NJ": [
        {"city": "Morristown", "link": "/vo2-max-test-in-morristown-nj-speedwell-ave"},
        {"city": "Manasquan", "link": "/vo2-max-test-in-manasquan-nj"},
        {"city": "Millburn", "link": "/vo2-max-test-in-millburn-nj"},
        {"city": "Wayne", "link": "/vo2-max-test-in-wayne-nj"},
    ],
    "NM": [
        {"city": "Las Cruces", "link": "/vo2-max-test-in-las-cruces-nm"},
        {"city": "Albuquerque", "link": "/vo2-max-test-in-albuquerque-nm"},
    ],
    "NY": [
        {"city": "New York", "link": "/vo2-max-test-in-nyc"},
        {"city": "Albany", "link": "/vo2-max-test-in-albany-ny-osborne-road"},
        {"city": "Garden City", "link": "/vo2-max-test-in-garden-city-ny"},
        {"city": "Plattsburgh", "link": "/vo2-max-test-in-plattsburgh-ny"},
        {"city": "Rochester", "link": "/vo2-max-test-in-rochester-ny"},
    ],
    "NC": [
        {"city": "Charlotte", "link": "/vo2-max-test-in-charlotte-nc"},
        {"city": "Raleigh", "link": "/vo2-max-test-in-raleigh-nc"},
        {"city": "Wilmington", "link": "/vo2-max-test-in-wilmington-nc"},
        {"city": "Greensboro", "link": "/vo2-max-test-in-greensboro-nc"},
        {"city": "Morrisville", "link": "/vo2-max-test-in-morrisville-nc"},
    ],
    "OH": [
        {"city": "Columbus", "link": "/vo2-max-test-in-columbus-oh"},
        {"city": "Cincinnati", "link": "/vo2-max-test-in-cincinnati-oh"},
        {"city": "Wadsworth", "link": "/vo2-max-test-in-wadsworth-oh"},
    ],
    "OK": [
        {"city": "Edmond", "link": "/vo2-max-test-in-oklahoma-city-edmond-ok"},
        {"city": "Stillwater", "link": "/vo2-max-test-in-stillwater-ok"},
        {"city": "Tulsa", "link": "/vo2-max-test-in-tulsa-ok"},
    ],
    "OR": [
        {"city": "Bend", "link": "/vo2-max-test-in-bend-or"},
        {"city": "Tigard", "link": "/vo2-max-test-in-tigard-or"},
    ],
    "PA": [
        {"city": "Pittsburgh", "link": "/vo2-max-test-in-pittsburgh-pa-baum-blvd"},
        {"city": "Conshohocken", "link": "/vo2-max-test-in-conshohocken-pa"},
        {"city": "Dunmore", "link": "/vo2-max-test-in-dunmore-pa"},
        {"city": "East Stroudsburg", "link": "/vo2-max-test-in-east-stroudsburg-pa"},
        {"city": "Wexford", "link": "/vo2-max-test-in-wexford-pa"},
        {"city": "Horsham", "link": "/vo2-max-test-in-horsham-pa"},
        {"city": "Phoenixville", "link": "/vo2-max-test-in-phoenixville-pa"},
    ],
    "SC": [
        {"city": "Greenville", "link": "/vo2-max-test-in-greenville-sc-laurens-rd"},
        {"city": "Mount Pleasant", "link": "/vo2-max-test-in-mount-pleasant-sc"},
    ],
    "SD": [{"city": "Sioux Falls", "link": "/vo2-max-test-in-sioux-falls-sd-e-57th-st"}],
    "TN": [
        {"city": "Nashville", "link": "/vo2-max-test-in-nashville-tn"},
        {"city": "Memphis", "link": "/vo2-max-test-in-memphis-tn-kirby-pkwy"},
        {"city": "Knoxville", "link": "/vo2-max-test-in-knoxville-tn-1"},
    ],
    "TX": [
        {"city": "Houston", "link": "/vo2-max-test-in-houston-tx"},
        {"city": "Dallas", "link": "/vo2-max-test-in-dallas-tx"},
        {"city": "Fort Worth", "link": "/vo2-max-test-in-fort-worth-tx"},
        {"city": "San Antonio", "link": "/vo2-max-test-in-san-antonio-tx"},
        {"city": "Austin", "link": "/vo2-max-test-in-austin-tx"},
        {"city": "El Paso", "link": "/vo2-max-test-in-el-paso-tx-montana-ave"},
        {"city": "Amarillo", "link": "/vo2-max-test-in-amarillo-tx"},
        {"city": "Plano", "link": "/vo2-max-test-in-plano-tx-tennyson-pkwy"},
        {"city": "College Station", "link": "/vo2-max-test-in-college-station-tx"},
        {"city": "Kyle", "link": "/vo2-max-test-in-kyle-tx"},
        {"city": "Mansfield", "link": "/vo2-max-test-in-mansfield-tx"},
    ],
    "UT": [
        {"city": "Lehi", "link": "/vo2-max-test-in-lehi-ut-w-mayflower-ave"},
        {"city": "Saint George", "link": "/vo2-max-test-in-saint-george-ut-e-riverside-dr"},
        {"city": "Logan", "link": "/vo2-max-test-in-logan-ut"},
        {"city": "Pleasant Grove", "link": "/vo2-max-test-in-pleasant-grove-ut"},
        {"city": "Murray", "link": "/vo2-max-test-in-salt-lake-city-ut"},
    ],
    "VA": [
        {"city": "Charlottesville", "link": "/vo2-max-test-in-charlottesville-va"},
        {"city": "Arlington", "link": "/vo2-max-test-in-arlington-va-n-randolph-st"},
        {"city": "Richmond", "link": "/vo2-max-test-in-richmond-va"},
        {"city": "Lansdowne", "link": "/vo2-max-test-in-lansdowne-va"},
        {"city": "Norfolk", "link": "/vo2-max-test-in-norfolk-va"},
        {"city": "Falls Church", "link": "/vo2-max-test-in-falls-church-va-park-ave"},
        {"city": "Manassas", "link": "/vo2-max-test-in-manassas-va"},
    ],
    "WA": [
        {"city": "Bellevue", "link": "/vo2-max-test-in-bellevue-wa-112th-ave"},
        {"city": "Olympia", "link": "/vo2-max-test-in-olympia-wa-rich-rd-se"},
        {"city": "Kirkland", "link": "/vo2-max-test-in-kirkland-wa"},
        {"city": "Redmond", "link": "/vo2-max-test-in-redmond-wa-ne-85th-street"},
    ],
    "WV": [{"city": "Benwood", "link": "/vo2-max-test-in-benwood-wv"}],
    "WI": [
        {"city": "La Crosse", "link": "/vo2-max-test-in-la-crosse-wi-4th-st-s"},
        {"city": "Delafield", "link": "/vo2-max-test-in-delafield-wi-n-genesee-st"},
        {"city": "Kenosha", "link": "/vo2-max-test-in-kenosha-wi"},
        {"city": "Milwaukee", "link": "/vo2-max-test-in-milwaukee-wi"},
        {"city": "Eau Claire", "link": "/vo2-max-test-in-eau-claire-wi"},
    ],
    "WY": [
        {"city": "Casper", "link": "/vo2-max-test-in-casper-wy"},
        {"city": "Wilson", "link": "/vo2-max-test-in-wilson-wy-n-fall-creek"},
    ],
}

BASE = "https://www.fitnescity.com"
facilities = []
for state, locations in SCRAPED.items():
    for loc in locations:
        facilities.append({
            "name": "",
            "city": loc["city"],
            "state": state,
            "address": "",
            "phone": "",
            "website": "",
            "source": "fitnescity",
            "source_url": BASE + loc["link"],
            "confirmed": True,
        })

out = json.dumps({
    "source": "fitnescity",
    "source_url": "https://www.fitnescity.com/vo2-max-test-locator",
    "facilities": facilities,
}, indent=2)

Path("scripts/directory/seed-fitnescity-v2.json").write_text(out)
print(f"Wrote {len(facilities)} facilities with real URLs")
