# Outscraper Google Maps Query Config

Run these queries on Outscraper (outscraper.com) to scrape Google Maps listings.

## Search Queries (run each across all 50 metros below)

1. `VO2 max testing`
2. `metabolic testing lab`
3. `CPET cardiopulmonary exercise testing`
4. `exercise physiology lab`
5. `sports performance testing`
6. `fitness metabolic assessment`

## Top 50 US Metro Areas

```
New York, NY
Los Angeles, CA
Chicago, IL
Houston, TX
Phoenix, AZ
Philadelphia, PA
San Antonio, TX
San Diego, CA
Dallas, TX
Austin, TX
Jacksonville, FL
San Jose, CA
Fort Worth, TX
Columbus, OH
Charlotte, NC
Indianapolis, IN
San Francisco, CA
Seattle, WA
Denver, CO
Nashville, TN
Oklahoma City, OK
Washington, DC
El Paso, TX
Las Vegas, NV
Boston, MA
Portland, OR
Memphis, TN
Louisville, KY
Baltimore, MD
Milwaukee, WI
Albuquerque, NM
Tucson, AZ
Fresno, CA
Mesa, AZ
Sacramento, CA
Atlanta, GA
Kansas City, MO
Omaha, NE
Colorado Springs, CO
Raleigh, NC
Long Beach, CA
Virginia Beach, VA
Miami, FL
Minneapolis, MN
Tampa, FL
New Orleans, LA
Cleveland, OH
Orlando, FL
Pittsburgh, PA
St. Louis, MO
```

## Outscraper Settings

- **Fields to extract:** name, full_address, city, state, zip, phone, website, rating, reviews_count, category, description, latitude, longitude
- **Limit:** 20 results per query per metro (to keep costs reasonable)
- **Output format:** CSV or JSON
- **Estimated results:** 6 queries × 50 metros × ~10 avg results = ~3,000 raw results
- **Estimated cost:** ~$6-10

## After Outscraper

1. Download the CSV/JSON results
2. Save as `scripts/directory/outscraper-results.json`
3. Run `python3 scripts/directory/process.py` to dedupe, classify, and merge with seed data
