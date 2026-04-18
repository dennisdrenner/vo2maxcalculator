#!/usr/bin/env python3
"""
Download facility photos from Google, resize to 400x300 JPEG,
and upload to Bunny.net CDN.

Updates directory-data.json with permanent photo_url fields.
"""
import io
import json
import os
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path
from PIL import Image

SCRIPT_DIR = Path(__file__).parent
DATA_PATH = SCRIPT_DIR.parent.parent / "lib" / "directory-data.json"

# Bunny CDN config
BUNNY_STORAGE_HOST = "ny.storage.bunnycdn.com"
BUNNY_STORAGE_ZONE = "calculatorsites"
BUNNY_ACCESS_KEY = os.environ.get(
    "BUNNY_ACCESS_KEY",
    "50b0bde1-33f7-4b2c-a26b855a434a-6961-4197",
)
BUNNY_CDN_BASE = "https://calculatorsites.b-cdn.net"
PHOTO_PATH = "vo2max/labs"

TARGET_WIDTH = 400
TARGET_HEIGHT = 300
JPEG_QUALITY = 80


def download_image(url, timeout=15):
    """Download image from URL, return bytes or None."""
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
    })
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.read()
    except Exception as e:
        return None


def resize_to_jpeg(image_bytes):
    """Resize image to TARGET_WIDTH x TARGET_HEIGHT JPEG, return bytes."""
    img = Image.open(io.BytesIO(image_bytes))
    img = img.convert("RGB")

    # Crop to target aspect ratio (4:3) then resize
    target_ratio = TARGET_WIDTH / TARGET_HEIGHT
    img_ratio = img.width / img.height

    if img_ratio > target_ratio:
        # Image is wider — crop sides
        new_width = int(img.height * target_ratio)
        left = (img.width - new_width) // 2
        img = img.crop((left, 0, left + new_width, img.height))
    elif img_ratio < target_ratio:
        # Image is taller — crop top/bottom
        new_height = int(img.width / target_ratio)
        top = (img.height - new_height) // 2
        img = img.crop((0, top, img.width, top + new_height))

    img = img.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.LANCZOS)

    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=JPEG_QUALITY, optimize=True)
    return buf.getvalue()


def upload_to_bunny(jpeg_bytes, filename):
    """Upload JPEG bytes to Bunny CDN. Returns CDN URL or None."""
    url = f"https://{BUNNY_STORAGE_HOST}/{BUNNY_STORAGE_ZONE}/{PHOTO_PATH}/{filename}"
    req = urllib.request.Request(
        url,
        method="PUT",
        headers={
            "AccessKey": BUNNY_ACCESS_KEY,
            "Content-Type": "application/octet-stream",
        },
        data=jpeg_bytes,
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            if resp.status in (200, 201):
                return f"{BUNNY_CDN_BASE}/{PHOTO_PATH}/{filename}"
    except Exception as e:
        print(f"      Upload error: {e}")
    return None


def main():
    print("=== Facility Photo Upload to Bunny CDN ===\n")

    # Load directory data
    data = json.loads(DATA_PATH.read_text())
    all_facilities = []
    for st, facs in data["states"].items():
        all_facilities.extend(facs)

    # Filter to facilities with Google photos but no CDN URL yet
    to_process = [
        f for f in all_facilities
        if f.get("photo") and not f.get("photo_url")
    ]
    already_done = sum(1 for f in all_facilities if f.get("photo_url"))

    print(f"  Total facilities: {len(all_facilities)}")
    print(f"  Already uploaded: {already_done}")
    print(f"  To process: {len(to_process)}")
    print()

    if not to_process:
        print("  Nothing to do!")
        return

    success = 0
    failed = 0
    total = len(to_process)

    for i, facility in enumerate(to_process):
        # Use place_id as filename, fallback to sanitized name
        place_id = facility.get("place_id", "")
        if place_id:
            filename = f"{place_id}.jpg"
        else:
            safe_name = "".join(
                c if c.isalnum() or c in "-_" else "-"
                for c in f"{facility['name']}-{facility['city']}-{facility['state']}"
            ).lower()
            filename = f"{safe_name}.jpg"

        photo_url = facility["photo"]

        # Download
        img_bytes = download_image(photo_url)
        if not img_bytes:
            failed += 1
            if (i + 1) % 50 == 0:
                print(f"  [{i+1}/{total}] {success} uploaded, {failed} failed")
            continue

        # Resize
        try:
            jpeg_bytes = resize_to_jpeg(img_bytes)
        except Exception as e:
            failed += 1
            continue

        # Upload
        cdn_url = upload_to_bunny(jpeg_bytes, filename)
        if cdn_url:
            facility["photo_url"] = cdn_url
            success += 1
        else:
            failed += 1

        if (i + 1) % 50 == 0:
            print(f"  [{i+1}/{total}] {success} uploaded, {failed} failed "
                  f"({len(jpeg_bytes)//1024}KB last)")

        # Small delay to be polite to Google & Bunny
        time.sleep(0.1)

    print(f"\n  Final: {success} uploaded, {failed} failed")

    # Save updated directory data
    print("\n  Saving updated directory-data.json...")
    DATA_PATH.write_text(json.dumps(data, indent=2))
    size_kb = DATA_PATH.stat().st_size / 1024
    print(f"  Done! ({size_kb:.0f} KB)")


if __name__ == "__main__":
    main()
