#!/usr/bin/env python3
"""
Scrape VO2 max testing facility locations from company websites.

Companies scraped:
1. DexaFit — franchise locations via known subdomains
2. LiveLeanRx — 20 locations from their website
3. DexaBody — 4 locations
4. DexaScan.com — partner network

Outputs to company-scrape-results.json
"""
import json
import re
import time
import urllib.request
import urllib.error
from html.parser import HTMLParser
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent


class TextExtractor(HTMLParser):
    """Simple HTML to text extractor."""
    def __init__(self):
        super().__init__()
        self.text = []
        self._skip = False

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "noscript"):
            self._skip = True

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript"):
            self._skip = False

    def handle_data(self, data):
        if not self._skip:
            self.text.append(data)

    def get_text(self):
        return " ".join(self.text)


def fetch_url(url, timeout=15):
    """Fetch a URL and return decoded text."""
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    })
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"    WARN: Failed to fetch {url}: {e}")
        return ""


def extract_text(html):
    """Extract text from HTML."""
    parser = TextExtractor()
    parser.feed(html)
    return parser.get_text()


# ============================================================
# DexaFit — known franchise subdomains
# ============================================================

DEXAFIT_LOCATIONS = [
    # (subdomain or full domain, city, state)
    ("atlanta.dexafit.com", "Atlanta", "GA"),
    ("boston.dexafit.com", "Boston", "MA"),
    ("broward.dexafit.com", "Fort Lauderdale", "FL"),
    ("cincinnati.dexafit.com", "Cincinnati", "OH"),
    ("clearlake.dexafit.com", "Clear Lake", "TX"),
    ("cleveland.dexafit.com", "Cleveland", "OH"),
    ("colorado.dexafit.com", "Denver", "CO"),
    ("denver.dexafit.com", "Denver", "CO"),
    ("detroit.dexafit.com", "Detroit", "MI"),
    ("florida.dexafit.com", "Jacksonville", "FL"),
    ("dexafitkc.com", "Olathe", "KS"),
    ("dexafitlv.com", "Las Vegas", "NV"),
    ("dexafitnj.com", "Paramus", "NJ"),
    ("dexafitwesthouston.com", "Houston", "TX"),
    ("losalamitos.dexafit.com", "Los Alamitos", "CA"),
    ("phoenix.dexafit.com", "Phoenix", "AZ"),
    ("roundrock.dexafit.com", "Round Rock", "TX"),
    ("scottsdale.dexafit.com", "Scottsdale", "AZ"),
    ("seattle.dexafit.com", "Seattle", "WA"),
    ("sfbayarea.dexafit.com", "San Francisco", "CA"),
    ("tampa.dexafit.com", "Tampa", "FL"),
    ("texas.dexafit.com", "Dallas", "TX"),
    ("woodlands.dexafit.com", "The Woodlands", "TX"),
    ("longevitywestport.com", "Westport", "CT"),
    ("dexafit.com/locations/new-york/long-island", "Long Island", "NY"),
    ("dexafit.com/locations/california/san-francisco", "San Francisco", "CA"),
]


def scrape_dexafit():
    """Build DexaFit location list from known subdomains."""
    print("\n[DexaFit] Scraping known franchise locations...")
    facilities = []
    seen = set()

    for domain, city, state in DEXAFIT_LOCATIONS:
        key = f"{city.lower()}|{state.lower()}"
        if key in seen:
            continue
        seen.add(key)

        url = f"https://www.{domain}" if "." in domain and "/" not in domain else f"https://{domain}"
        html = fetch_url(url)

        # Try to extract address and phone from the page
        address = ""
        phone = ""
        website = url

        if html:
            # Look for address patterns
            addr_match = re.search(
                r'(\d+\s+[\w\s.]+(?:St|Street|Ave|Avenue|Blvd|Boulevard|Rd|Road|Dr|Drive|Way|Pkwy|Parkway|Ln|Lane|Ct|Court|Pl|Place|Cir|Circle)[\w\s.,]*(?:Suite|Ste|#|Unit)?\s*\d*[,\s]*(?:[A-Z][a-z]+[\s,]*)+[A-Z]{2}\s+\d{5})',
                html
            )
            if addr_match:
                address = addr_match.group(1).strip()

            # Look for phone
            phone_match = re.search(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', html)
            if phone_match:
                phone = phone_match.group(0)

        facilities.append({
            "name": f"DexaFit {city}",
            "city": city,
            "state": state,
            "address": address,
            "phone": phone,
            "website": website,
            "source": "dexafit",
            "source_url": url,
        })
        print(f"    {city}, {state} — {'address found' if address else 'no address'}")
        time.sleep(0.5)

    print(f"  Total DexaFit locations: {len(facilities)}")
    return facilities


# ============================================================
# LiveLeanRx — 20 locations
# ============================================================

LIVELEANRX_LOCATIONS = [
    ("atlanta-georgia", "Atlanta", "GA"),
    ("austin-texas", "Austin", "TX"),
    ("charlotte-nc", "Charlotte", "NC"),
    ("chattanooga-tn", "Chattanooga", "TN"),
    ("chicago-illinois", "Chicago", "IL"),
    ("cincinnati-oh", "Cincinnati", "OH"),
    ("colorado-springs-colorado", "Colorado Springs", "CO"),
    ("dallas-fort-worth-texas", "Dallas", "TX"),
    ("denver-north-west-colorado", "Denver", "CO"),
    ("denver-south-colorado", "Denver South", "CO"),
    ("houston-texas", "Houston", "TX"),
    ("indianapolis-indiana", "Indianapolis", "IN"),
    ("libertyville-illinois", "Libertyville", "IL"),
    ("louisville-kentucky", "Louisville", "KY"),
    ("milford-connecticut", "Milford", "CT"),
    ("nashville-tn", "Nashville", "TN"),
    ("phoenix-scottsdale-arizona", "Scottsdale", "AZ"),
    ("redmond-washington", "Redmond", "WA"),
    ("san-diego-california", "San Diego", "CA"),
    ("warrenville-illinois", "Warrenville", "IL"),
]


def scrape_liveleanrx():
    """Scrape LiveLeanRx location pages for addresses."""
    print("\n[LiveLeanRx] Scraping location pages...")
    facilities = []

    for slug, city, state in LIVELEANRX_LOCATIONS:
        url = f"https://liveleanrx.com/locations/{slug}"
        html = fetch_url(url)

        address = ""
        phone = ""

        if html:
            # Look for address
            addr_match = re.search(
                r'"(\d+\s+[^"]+(?:Suite|Ste|#|Unit)?\s*[^"]*[A-Z]{2}\s*\d{5}?)"',
                html
            )
            if not addr_match:
                addr_match = re.search(
                    r'(\d+\s+[\w\s.]+(?:St|Street|Ave|Avenue|Blvd|Dr|Drive|Way|Rd|Road|Pkwy|Ln|Lane)[\w\s.,#]*)',
                    html
                )
            if addr_match:
                address = addr_match.group(1).strip()

            # Phone
            phone_match = re.search(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', html)
            if phone_match:
                phone = phone_match.group(0)

        facilities.append({
            "name": f"Live Lean Rx {city}",
            "city": city,
            "state": state,
            "address": address,
            "phone": phone,
            "website": url,
            "source": "liveleanrx",
            "source_url": url,
        })
        print(f"    {city}, {state} — {'address found' if address else 'no address'}")
        time.sleep(0.5)

    print(f"  Total LiveLeanRx locations: {len(facilities)}")
    return facilities


# ============================================================
# DexaBody — 4 locations (hardcoded from website)
# ============================================================

def get_dexabody():
    """Return known DexaBody locations."""
    print("\n[DexaBody] Adding known locations...")
    facilities = [
        {
            "name": "DexaBody Salt Lake City",
            "city": "Salt Lake City",
            "state": "UT",
            "address": "5263 Commerce Drive, Suite 201",
            "phone": "",
            "website": "https://dexabody.com/",
            "source": "dexabody",
            "source_url": "https://dexabody.com/",
        },
        {
            "name": "DexaBody San Diego",
            "city": "San Diego",
            "state": "CA",
            "address": "5465 Morehouse Drive, Suite 170",
            "phone": "",
            "website": "https://dexabody.com/",
            "source": "dexabody",
            "source_url": "https://dexabody.com/",
        },
        {
            "name": "DexaBody Scottsdale",
            "city": "Scottsdale",
            "state": "AZ",
            "address": "11111 N. Scottsdale Rd, Suite 205",
            "phone": "",
            "website": "https://dexabody.com/",
            "source": "dexabody",
            "source_url": "https://dexabody.com/",
        },
        {
            "name": "DexaBody Atlanta",
            "city": "Atlanta",
            "state": "GA",
            "address": "3355 Lenox Road, Suite 750",
            "phone": "",
            "website": "https://dexabody.com/",
            "source": "dexabody",
            "source_url": "https://dexabody.com/",
        },
    ]
    print(f"  Total DexaBody locations: {len(facilities)}")
    return facilities


# ============================================================
# Main
# ============================================================

def main():
    print("=== Company Website Scraper ===\n")

    all_facilities = []

    dexafit = scrape_dexafit()
    all_facilities.extend(dexafit)

    liveleanrx = scrape_liveleanrx()
    all_facilities.extend(liveleanrx)

    dexabody = get_dexabody()
    all_facilities.extend(dexabody)

    print(f"\n=== Summary ===")
    print(f"  DexaFit:    {len(dexafit)}")
    print(f"  LiveLeanRx: {len(liveleanrx)}")
    print(f"  DexaBody:   {len(dexabody)}")
    print(f"  Total:      {len(all_facilities)}")

    out_path = SCRIPT_DIR / "company-scrape-results.json"
    out_path.write_text(json.dumps(all_facilities, indent=2))
    print(f"\n  Saved to {out_path}")


if __name__ == "__main__":
    main()
