"""
Generate 2 additional inline images per markdown post (40 total) and insert
each into its post after deeper H2 sections so they're spaced out, not
clustered with the existing inline-1.
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

# slug -> [(suffix, prompt, alt), (suffix, prompt, alt)]
EXTRAS = {
    "vo2max-predicts-lifespan": [
        ("inline-2", "Photograph of an older couple in their sixties cycling side by side on a smooth paved bike path through autumn trees, soft afternoon light, joyful expressions." + STYLE,
         "Older couple cycling together on a tree-lined path."),
        ("inline-3", "Close-up photograph of a sport watch on a wrist showing a clean digital heart rate readout, slight motion blur, sunlight catching the screen edge." + STYLE,
         "Sport watch on a runner's wrist showing a high heart rate during exercise."),
    ],
    "10-second-sprints-vo2max": [
        ("inline-2", "Photograph of starting blocks on an outdoor red running track in early morning light, dramatic side-lit composition, no people." + STYLE,
         "Empty starting blocks on a track in early morning light."),
        ("inline-3", "Photograph of a person mid-sprint on a track from behind, motion blur on the legs and arms, intense focused effort, late afternoon sun." + STYLE,
         "A sprinter shot from behind mid-stride with motion blur."),
    ],
    "couch-to-top-25-percent-vo2max": [
        ("inline-2", "Photograph of a runner on a forest trail at golden hour, mid-stride, focused but relaxed expression, dappled light through trees." + STYLE,
         "A runner on a forest trail at golden hour."),
        ("inline-3", "Close-up photograph of a person checking a GPS sport watch on their wrist after a workout, slightly out of breath, clean park background." + STYLE,
         "Runner checking their GPS watch after a workout."),
    ],
    "vo2max-at-80-masters-athletes": [
        ("inline-2", "Photograph of an older man in his seventies swimming laps in an outdoor pool, strong stroke, water splashing, bright daylight." + STYLE,
         "Older swimmer doing laps in an outdoor pool."),
        ("inline-3", "Photograph of an older woman doing a balance pose on a yoga mat outdoors at sunrise, calm focus, natural composition." + STYLE,
         "Older woman doing a balance pose on a yoga mat outdoors."),
    ],
    "experts-agree-disagree-vo2max": [
        ("inline-2", "Photograph of a researcher's hands working at a laptop next to a printed scientific journal article on a wooden desk, soft window light." + STYLE,
         "A researcher reviewing a scientific paper at a laptop."),
        ("inline-3", "Photograph of an exercise physiology lab with a treadmill in the background and a metabolic cart in the foreground, clean clinical aesthetic." + STYLE,
         "Exercise physiology lab with a treadmill and metabolic cart."),
    ],
    "andrew-huberman-vo2max": [
        ("inline-2", "Photograph of a person mid-zone-2 cycling on a stationary bike in a clean home gym, calm steady effort, heart-rate monitor visible on the chest." + STYLE,
         "A person riding a stationary bike at a steady zone-2 pace."),
        ("inline-3", "Photograph of a stopwatch and a sweat-soaked towel on a black gym mat, dramatic light, after-workout aesthetic." + STYLE,
         "Stopwatch and sweat-soaked towel on a gym mat after a workout."),
    ],
    "andy-galpin-vo2max-training": [
        ("inline-2", "Detailed scientific illustration of a human heart in cross-section showing the four chambers, with stylized blood flow arrows. Clean educational anatomy aesthetic." + ILLUSTRATION_STYLE,
         "Anatomical illustration of the human heart with blood flow."),
        ("inline-3", "Photograph of an athlete on a treadmill wearing a metabolic cart mask and chest strap, exercise physiology lab setting, focused expression." + STYLE,
         "Athlete on a treadmill in a lab wearing a metabolic mask."),
    ],
    "inigo-san-millan-zone-2": [
        ("inline-2", "Photograph from a cyclist's first-person perspective riding on a quiet alpine road at sunrise, mountains in the distance, hands on drop bars in frame." + STYLE,
         "First-person view of cycling on an alpine road at sunrise."),
        ("inline-3", "Photograph of a cyclist in a lab on a stationary trainer wearing a metabolic cart mask and lactate-test finger sensor, clinical setting." + STYLE,
         "Cyclist on a lab trainer with metabolic cart and lactate sensor."),
    ],
    "rhonda-patrick-vo2max-tabata": [
        ("inline-2", "Photograph of a sauna interior with a stack of basalt stones in the corner glowing warm, wood walls, soft amber light, no people." + STYLE,
         "Interior of a sauna with glowing stones and wood walls."),
        ("inline-3", "Photograph of an outdoor cold plunge tub with steam rising off the water on a cold morning, surrounded by stone tiles." + STYLE,
         "Outdoor cold plunge tub with steam rising at dawn."),
    ],
    "zone-2-vs-hiit-debate": [
        ("inline-2", "Photograph of an empty outdoor running track in golden-hour light, lane lines visible, dramatic side shadows, no people." + STYLE,
         "Empty outdoor running track in golden hour."),
        ("inline-3", "Photograph of a misty forest trail at sunrise with low ground fog and beams of light through the trees, no people." + STYLE,
         "Misty forest trail at sunrise."),
    ],
    "vo2max-non-responders-cardio": [
        ("inline-2", "Photograph of a person doing a burpee in a clean home gym, mid-jump, dramatic side light, focused expression." + STYLE,
         "A person doing a burpee in a home gym."),
        ("inline-3", "Photograph of a fitness display showing a heart rate trace climbing into a high zone, slight motion blur, gym backdrop." + STYLE,
         "Fitness display showing a heart rate trace in the high zone."),
    ],
    "10-minute-vo2max-workout": [
        ("inline-2", "Photograph of a person doing high knees in a small living room, mid-motion blur on the legs, casual home setting, soft window light." + STYLE,
         "Person doing high knees in a living room."),
        ("inline-3", "Photograph of a person taking the stairs two at a time in a modern building stairwell, dynamic motion, clean architectural light." + STYLE,
         "Person taking stairs two at a time in a stairwell."),
    ],
    "vo2max-and-weight-training": [
        ("inline-2", "Photograph of a person doing a kettlebell swing in a home gym, mid-swing, motion blur on the bell, focused intensity." + STYLE,
         "A person doing a kettlebell swing in a home gym."),
        ("inline-3", "Photograph of a clean squat rack in a modern gym with loaded plates resting nearby, no people, natural daylight." + STYLE,
         "Squat rack in a modern gym with loaded plates."),
    ],
    "norwegian-training-method-vo2max": [
        ("inline-2", "Photograph of an athlete doing 4x4-style intervals on an outdoor steep paved hill, focused effort, dawn light, breath visible in cold air." + STYLE,
         "Athlete doing hill intervals at dawn with visible breath."),
        ("inline-3", "Photograph of a Norwegian fjord at sunrise with a small running figure on a road in the foreground, dramatic landscape." + STYLE,
         "Runner on a road by a Norwegian fjord at sunrise."),
    ],
    "test-vo2max-at-home": [
        ("inline-2", "Close-up photograph of a smartwatch on a wrist displaying a clean fitness stat readout, slight motion blur of an active person in the background." + STYLE,
         "Close-up of a smartwatch on a wrist showing fitness stats."),
        ("inline-3", "Photograph of a runner stopped at the side of a paved path checking a phone for a fitness reading, soft afternoon light." + STYLE,
         "Runner pausing on a path to check a fitness app."),
    ],
    "vo2max-after-40": [
        ("inline-2", "Photograph of a fit person in their late forties doing dumbbell rows in a clean modern gym, focused expression, natural daylight." + STYLE,
         "Person in their late forties doing dumbbell rows."),
        ("inline-3", "Photograph of a couple in their fifties running together on a beach path at sunset, joyful expressions, side-lit." + STYLE,
         "A couple in their fifties running together on a beach path at sunset."),
    ],
    "lactate-not-the-enemy": [
        ("inline-2", "Photograph of a runner pushing through the burn at the end of a hard interval on a track, grimace of effort, late afternoon side light." + STYLE,
         "Runner pushing through the burn at the end of a hard interval."),
        ("inline-3", "Scientific illustration of a brain receiving glowing orange energy molecules from the bloodstream, beautiful warm-tone neural network style." + ILLUSTRATION_STYLE,
         "Illustration of the brain receiving energy molecules via the bloodstream."),
    ],
    "vo2max-brain-health-bdnf": [
        ("inline-2", "Photograph of a person reading a book by a window with sunlight streaming in, content focused expression, calm domestic scene." + STYLE,
         "A person reading a book by a sunlit window."),
        ("inline-3", "Photograph of a person doing a morning bodyweight workout outdoors at sunrise, dynamic motion, clear focus." + STYLE,
         "A person doing a morning bodyweight workout outdoors at sunrise."),
    ],
    "exercise-snacks-vo2max": [
        ("inline-2", "Photograph of an office worker doing chair squats next to a desk in business casual clothes, mid-squat, soft office light." + STYLE,
         "Office worker doing chair squats next to a desk."),
        ("inline-3", "Photograph of two colleagues having a walking meeting on a tree-lined city sidewalk in the afternoon, gesturing in conversation." + STYLE,
         "Colleagues having a walking meeting on a city sidewalk."),
    ],
    "insulin-resistance-vo2max": [
        ("inline-2", "Photograph of a fit person prepping a healthy meal of vegetables and lean protein on a clean kitchen counter, natural daylight, hands in frame." + STYLE,
         "Hands preparing a healthy meal of vegetables and lean protein."),
        ("inline-3", "Photograph of a finger-prick blood-glucose meter on a kitchen counter next to running shoes, soft daylight, minimalist composition." + STYLE,
         "A blood-glucose meter on a kitchen counter next to running shoes."),
    ],
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


def compress_to_jpeg(raw_bytes: bytes, max_bytes: int = 110_000, target_size=(720, 540)) -> bytes:
    img = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    img = img.resize(target_size, Image.LANCZOS)
    quality = 82
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


def find_md_file(slug: str) -> Path | None:
    for p in POSTS_DIR.glob("*.md"):
        if p.stem.endswith(slug):
            return p
    return None


def insert_at_h2_index(text: str, h2_index: int, image_md: str) -> str | None:
    """Insert image_md immediately after the paragraph following the H2 at the
    given 0-based index. Returns the new text, or None if the H2 doesn't exist
    or insertion would collide with an existing image."""
    body_start = 0
    if text.startswith("---"):
        m = re.search(r"\n---\s*\n", text)
        if m:
            body_start = m.end()

    h2_matches = list(re.finditer(r"^## .+$", text[body_start:], re.MULTILINE))
    if h2_index >= len(h2_matches):
        return None

    h2_end = body_start + h2_matches[h2_index].end()
    after = text[h2_end:]
    para_break = after.find("\n\n")
    if para_break == -1:
        return None
    insert_pos = h2_end + para_break

    # Avoid clustering: if there's already an image within 200 chars of insertion
    nearby = text[max(0, insert_pos - 200): insert_pos + 200]
    if image_md.split("](")[1] in nearby:
        return text  # already present
    return text[:insert_pos] + "\n\n" + image_md + text[insert_pos:]


def main():
    only = set(sys.argv[1:]) if len(sys.argv) > 1 else None
    successes, failures = [], []

    for slug, items in EXTRAS.items():
        if only and slug not in only:
            continue
        md_file = find_md_file(slug)
        if not md_file:
            print(f"[{slug}] WARN: no .md file found")
            continue

        text = md_file.read_text()
        for idx, (suffix, prompt, alt) in enumerate(items):
            # idx 0 -> inline-2 -> insert at H2 index 2 (3rd H2)
            # idx 1 -> inline-3 -> insert at H2 index 4 (5th H2)
            target_h2 = [2, 4][idx]
            print(f"[{slug}/{suffix}] generating...", flush=True)
            try:
                status_url, response_url = submit_flux(prompt)
                image_url = poll(status_url, response_url)
                raw = requests.get(image_url, timeout=60).content
                jpeg = compress_to_jpeg(raw)
                cdn_url = bunny_upload(f"{slug}-{suffix}.jpg", jpeg)
                print(f"  -> {cdn_url} ({len(jpeg)//1024} KB)", flush=True)

                image_md = f"![{alt}]({cdn_url})"
                # Try preferred H2 index, fall back to deeper indices if missing
                new_text = None
                for h2_idx in [target_h2, target_h2 - 1, target_h2 + 1, target_h2 - 2, target_h2 + 2, 1, 0]:
                    if h2_idx < 0:
                        continue
                    candidate = insert_at_h2_index(text, h2_idx, image_md)
                    if candidate is not None and candidate != text:
                        new_text = candidate
                        print(f"  inserted at H2 #{h2_idx + 1}")
                        break
                if new_text is None:
                    print(f"  WARN: no suitable H2 for insertion")
                else:
                    text = new_text
                successes.append((slug, suffix, len(jpeg)))
            except Exception as e:
                print(f"  FAILED: {e}", flush=True)
                failures.append((slug, suffix, str(e)))

        md_file.write_text(text)

    print()
    print(f"Done. {len(successes)} ok, {len(failures)} failed.")
    for s, sx, err in failures:
        print(f"  FAIL {s}/{sx}: {err}")


if __name__ == "__main__":
    main()
