"""
Generate 20 inline images (one per markdown post) and insert each into its
post just after the first H2. Run from project root.
"""
import io
import re
import sys
import time
from pathlib import Path

import requests
from PIL import Image

FAL_KEY = "d50f744b-72ee-4616-aac2-2669c73c9626:d30ca7337789730db85b5c491366e0d7"
BUNNY_KEY = "50b0bde1-33f7-4b2c-a26b855a434a-6961-4197"
BUNNY_ZONE = "calculatorsites"
BUNNY_REGION = "ny"
BUNNY_FOLDER = "vo2max/blog"
CDN_BASE = "https://calculatorsites.b-cdn.net"

POSTS_DIR = Path("content/blog/posts")

STYLE = (
    " Editorial fitness photography, natural light, sharp focus, real people, "
    "clean composition, no text, no words, no letters, no labels."
)
ILLUSTRATION_STYLE = (
    " Clean modern editorial illustration, warm tones, "
    "no text, no words, no letters, no labels."
)

# slug -> (prompt, alt_text)
INLINE_SPECS = {
    "vo2max-predicts-lifespan": (
        "Close-up photograph of a doctor's hands holding a stethoscope against a fit middle-aged person's chest in a bright modern clinic. Trust and clinical care meeting active health." + STYLE,
        "Doctor checking a patient's heart with a stethoscope, illustrating cardiovascular fitness as a clinical measure.",
    ),
    "10-second-sprints-vo2max": (
        "Close-up photograph of a digital sports stopwatch held in a hand at a track edge, showing the sweep second hand mid-second. Crisp focus, soft track blurred behind." + STYLE,
        "A digital stopwatch at the edge of a running track, ticking through a 10-second sprint interval.",
    ),
    "couch-to-top-25-percent-vo2max": (
        "Photograph of a person tying their running shoes on the front step of a house in early morning light, ready to head out for a run. Quiet determination, real and relatable." + STYLE,
        "A person lacing up running shoes on a porch in morning light, beginning a training routine.",
    ),
    "vo2max-at-80-masters-athletes": (
        "Photograph of an older woman in her seventies running with friends on a sunlit park path, laughing and chatting. Vivid joy of healthy aging, warm afternoon light." + STYLE,
        "Older runners chatting and smiling on a park path in late-afternoon sunlight.",
    ),
    "experts-agree-disagree-vo2max": (
        "Close-up photograph of a researcher's hand pointing at a printed bar chart on a wooden table, with another expert's hand resting on a coffee mug nearby. Documentary photo style." + STYLE,
        "A researcher pointing to a bar chart on a table during a panel discussion.",
    ),
    "andrew-huberman-vo2max": (
        "Photograph of a person in zone 5 effort on a fan-resistance assault bike in a clean home gym, dramatic side lighting, motion blur on the fan blades." + STYLE,
        "A person riding a fan-resistance assault bike at maximum effort with motion blur on the fan blades.",
    ),
    "andy-galpin-vo2max-training": (
        "Photograph of an athlete on an indoor rowing machine, mid-stroke, heart-rate monitor strap visible across the chest, clean modern gym environment, dramatic overhead light." + STYLE,
        "Athlete mid-stroke on a rowing machine wearing a chest heart-rate monitor.",
    ),
    "inigo-san-millan-zone-2": (
        "Close-up photograph of a cycling computer mounted on a road-bike handlebar showing a steady heart rate display, bright daylight, hands gripping the bars in the background slightly out of focus." + STYLE,
        "A cycling computer on a road-bike handlebar showing a steady zone-2 heart rate.",
    ),
    "rhonda-patrick-vo2max-tabata": (
        "Photograph of a smartphone propped on a yoga mat next to a folded white sweat towel, screen showing a circular interval timer mid-cycle. Bright minimalist home gym." + STYLE,
        "A phone with a Tabata interval timer beside a folded sweat towel on a yoga mat.",
    ),
    "zone-2-vs-hiit-debate": (
        "Photograph composition of two pairs of running shoes side by side on a gym floor — on the left, well-worn easy-day trainers; on the right, sleek racing flats. Even, soft daylight." + STYLE,
        "Two pairs of running shoes side by side: easy-day trainers and racing flats.",
    ),
    "vo2max-non-responders-cardio": (
        "Photograph of a person doing all-out sprint repeats on an outdoor running track, mid-stride, visible exertion, dramatic afternoon side light." + STYLE,
        "A runner mid-stride during all-out sprint intervals on an outdoor track.",
    ),
    "10-minute-vo2max-workout": (
        "Photograph of a treadmill console close-up showing a clean digital readout mid-workout, with a runner's torso slightly out of focus in the background." + STYLE,
        "A treadmill console mid-workout with a runner's torso visible behind.",
    ),
    "vo2max-and-weight-training": (
        "Photograph of a barbell loaded with plates resting on a gym floor next to a stationary bike. Clean modern gym, natural skylight, no people." + STYLE,
        "A loaded barbell next to a stationary bike on a gym floor.",
    ),
    "norwegian-training-method-vo2max": (
        "Photograph of a runner in cold-weather gear running uphill on a misty mountain road at dawn, breath visible, focused expression. Powerful, disciplined, Nordic in feel." + STYLE,
        "A runner ascending a misty mountain road in cold conditions at dawn.",
    ),
    "test-vo2max-at-home": (
        "Overhead flat-lay photograph on a clean white surface: a sport watch, a heart-rate chest strap, a smartphone, and a pair of running shoes arranged neatly. Soft daylight, minimalist composition." + STYLE,
        "Overhead flat-lay of a sport watch, chest strap, phone, and running shoes used for at-home VO2 max testing.",
    ),
    "vo2max-after-40": (
        "Photograph of a fit person in their late forties hiking up a steep rocky trail with a backpack, alpine landscape behind, golden afternoon light, focused but joyful expression." + STYLE,
        "A fit hiker in their late forties climbing a steep alpine trail in golden light.",
    ),
    "lactate-not-the-enemy": (
        "Close-up scientific illustration of glowing orange lactate molecules flowing through a blood vessel toward a muscle cell shown in cross-section. Beautiful warm-tone cellular biology aesthetic." + ILLUSTRATION_STYLE,
        "Scientific illustration of lactate molecules flowing through a blood vessel toward a muscle cell.",
    ),
    "vo2max-brain-health-bdnf": (
        "Photograph of a runner cresting a hill at sunrise, shot from behind with the rising sun lighting their head and shoulders. Quiet, contemplative, suggestive of brain and consciousness." + STYLE,
        "A runner cresting a hill at sunrise, lit from behind, suggesting the link between exercise and brain health.",
    ),
    "exercise-snacks-vo2max": (
        "Photograph of a person briskly walking down a city sidewalk carrying a takeaway coffee, business casual clothes, mid-stride, golden side-lit afternoon city light." + STYLE,
        "A person walking briskly down a city sidewalk during a workday — an everyday exercise snack.",
    ),
    "insulin-resistance-vo2max": (
        "Close-up illustration of a muscle cell cross-section with glowing blue exercise-activated transporters and glowing green insulin-activated transporters on its surface. Clean accessible scientific illustration with warm and cool color contrast." + ILLUSTRATION_STYLE,
        "Illustration of a muscle cell with both exercise-activated and insulin-activated glucose transporters.",
    ),
}


def submit_flux(prompt: str):
    r = requests.post(
        "https://queue.fal.run/fal-ai/flux/dev",
        headers={"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"},
        json={
            "prompt": prompt,
            "image_size": {"width": 1024, "height": 768},
            "num_images": 1,
            "num_inference_steps": 28,
            "guidance_scale": 3.5,
            "enable_safety_checker": False,
            "output_format": "jpeg",
        },
        timeout=60,
    )
    r.raise_for_status()
    j = r.json()
    return j["status_url"], j["response_url"]


def poll(status_url: str, response_url: str, timeout_s: int = 180) -> str:
    started = time.time()
    while True:
        s = requests.get(status_url, headers={"Authorization": f"Key {FAL_KEY}"}, timeout=30).json()
        status = s.get("status")
        if status == "COMPLETED":
            final = requests.get(response_url, headers={"Authorization": f"Key {FAL_KEY}"}, timeout=60).json()
            return final["images"][0]["url"]
        if status in ("FAILED", "ERROR"):
            raise RuntimeError(f"FAL gen failed: {s}")
        if time.time() - started > timeout_s:
            raise TimeoutError(f"FAL gen timeout after {timeout_s}s")
        time.sleep(4)


def compress_to_jpeg(raw_bytes: bytes, max_bytes: int = 130_000, target_size=(800, 600)) -> bytes:
    img = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    img = img.resize(target_size, Image.LANCZOS)
    quality = 85
    while quality >= 60:
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=quality, optimize=True, progressive=True)
        data = buf.getvalue()
        if len(data) <= max_bytes or quality == 60:
            return data
        quality -= 5
    return data


def bunny_upload(filename: str, jpeg_bytes: bytes) -> str:
    url = f"https://{BUNNY_REGION}.storage.bunnycdn.com/{BUNNY_ZONE}/{BUNNY_FOLDER}/{filename}"
    r = requests.put(
        url,
        headers={"AccessKey": BUNNY_KEY, "Content-Type": "application/octet-stream"},
        data=jpeg_bytes,
        timeout=60,
    )
    if r.status_code != 201:
        raise RuntimeError(f"Bunny upload failed {r.status_code}: {r.text}")
    return f"{CDN_BASE}/{BUNNY_FOLDER}/{filename}"


def insert_into_post(slug: str, image_url: str, alt: str) -> bool:
    """Insert a markdown image just after the first H2 of the matching .md file."""
    md_files = list(POSTS_DIR.glob(f"*-{slug}.md"))
    if not md_files:
        # fall back to slug-only suffix match
        md_files = [p for p in POSTS_DIR.glob("*.md") if p.stem.endswith(slug)]
    if not md_files:
        print(f"  WARN: no .md file for slug {slug}")
        return False
    md_file = md_files[0]
    text = md_file.read_text()

    if image_url in text:
        print(f"  (already present in {md_file.name})")
        return True

    # Find the first H2 ("## ") that's NOT the H1 and not in frontmatter.
    # gray-matter style frontmatter is between the first two `---` lines.
    body_start = 0
    if text.startswith("---"):
        m = re.search(r"\n---\s*\n", text)
        if m:
            body_start = m.end()

    body = text[body_start:]
    h2_match = re.search(r"^## .+$", body, re.MULTILINE)
    if not h2_match:
        print(f"  WARN: no H2 found in {md_file.name}, skipping insert")
        return False

    insert_at = body_start + h2_match.end()
    # Find end of the paragraph following the H2 (next blank line)
    after_h2 = text[insert_at:]
    para_break = after_h2.find("\n\n")
    if para_break == -1:
        return False
    insert_pos = insert_at + para_break

    image_md = f"\n\n![{alt}]({image_url})"
    new_text = text[:insert_pos] + image_md + text[insert_pos:]
    md_file.write_text(new_text)
    print(f"  inserted into {md_file.name}")
    return True


def main():
    only = set(sys.argv[1:]) if len(sys.argv) > 1 else None
    successes, failures = [], []
    for slug, (prompt, alt) in INLINE_SPECS.items():
        if only and slug not in only:
            continue
        print(f"[{slug}] generating...", flush=True)
        try:
            status_url, response_url = submit_flux(prompt)
            image_url = poll(status_url, response_url)
            raw = requests.get(image_url, timeout=60).content
            jpeg = compress_to_jpeg(raw)
            cdn_url = bunny_upload(f"{slug}-inline.jpg", jpeg)
            print(f"  -> {cdn_url} ({len(jpeg)//1024} KB)", flush=True)
            insert_into_post(slug, cdn_url, alt)
            successes.append((slug, cdn_url, len(jpeg)))
        except Exception as e:
            print(f"  FAILED: {e}", flush=True)
            failures.append((slug, str(e)))
    print()
    print(f"Done. {len(successes)} ok, {len(failures)} failed.")
    for s, err in failures:
        print(f"  FAIL {s}: {err}")


if __name__ == "__main__":
    main()
