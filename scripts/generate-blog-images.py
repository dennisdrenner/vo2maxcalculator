"""
Generate 20 hero images for blog posts via fal.ai FLUX, compress to JPEG,
upload to Bunny CDN. Run from project root.
"""
import io
import os
import sys
import time

import requests
from PIL import Image

FAL_KEY = "d50f744b-72ee-4616-aac2-2669c73c9626:d30ca7337789730db85b5c491366e0d7"
BUNNY_KEY = "50b0bde1-33f7-4b2c-a26b855a434a-6961-4197"
BUNNY_ZONE = "calculatorsites"
BUNNY_REGION = "ny"
BUNNY_FOLDER = "vo2max/blog"

STYLE = (
    " Editorial fitness photography, natural light, real people not models, "
    "clean composition, no text, no words, no letters, no labels."
)
ILLUSTRATION_STYLE = (
    " Clean modern editorial illustration, warm tones, "
    "no text, no words, no letters, no labels."
)

PROMPTS = [
    ("vo2max-predicts-lifespan",
     "Bright energetic photo of a middle-aged person 45 to 55 running outdoors on a forest trail at sunset, expression of focused joy, golden warm light. Shot from slightly below to make them look powerful and vital." + STYLE),
    ("10-second-sprints-vo2max",
     "Dynamic slightly motion-blurred action shot of an athlete in workout clothes sprinting at maximum effort on an outdoor running track, mouth open, arms pumping, captured at the peak of explosive motion. Dramatic side lighting." + STYLE),
    ("couch-to-top-25-percent-vo2max",
     "Inspiring photo of a person mid-jog on an outdoor path at golden hour, looking energized and vibrant, athletic clothing, light sweat, focused expression. Warm tones, sense of transformation and momentum." + STYLE),
    ("vo2max-at-80-masters-athletes",
     "Vibrant inspiring photograph of a fit older man in his late sixties or seventies cycling outdoors on a road bike, helmet on, smiling, sunlit countryside background. Vitality of healthy aging." + STYLE),
    ("experts-agree-disagree-vo2max",
     "Editorial illustration of five diverse scientist and doctor figures seated around a table with a central abstract chart of an upward curve, friendly magazine-feature aesthetic, warm tones." + ILLUSTRATION_STYLE),
    ("andrew-huberman-vo2max",
     "Close-up action shot of a man riding a stationary assault bike at absolute maximum effort, knuckles tight on the handles, sweat, total exertion. Dramatic side lighting, slight motion blur on the moving fan." + STYLE),
    ("andy-galpin-vo2max-training",
     "Serious athlete doing sprint intervals on a rowing machine in a clean modern gym, shown in profile, intense focused expression, perfect form, dramatic overhead lighting. Purposeful and scientific." + STYLE),
    ("inigo-san-millan-zone-2",
     "Professional road cyclist in full kit and helmet, face not visible, riding at steady pace through an alpine landscape, mountains in the background, smooth open road, soft morning light. Effortless and sustainable." + STYLE),
    ("rhonda-patrick-vo2max-tabata",
     "Woman on a stationary bike in a minimalist home gym at maximum effort, hands gripping the bars hard, intense focused expression, bright natural light through a window. Real effort, not posed." + STYLE),
    ("zone-2-vs-hiit-debate",
     "Two-frame split image of the same runner: on the left running at easy conversational pace on a forest trail in soft light, on the right mid-sprint at full effort on an outdoor track in dramatic light. Visual contrast between sustainable and explosive." + STYLE),
    ("vo2max-non-responders-cardio",
     "Close-up of a person on a treadmill with a frustrated determined expression, treadmill display partly visible. Honest and relatable look of trying hard. Fluorescent gym light, slight desaturation." + STYLE),
    ("10-minute-vo2max-workout",
     "Person in business casual clothes doing jumping jacks in a corporate office stairwell, mid-motion, slight motion blur. Slightly humorous and relatable. Warm office lighting." + STYLE),
    ("vo2max-and-weight-training",
     "Two-frame split image of the same person: on the left doing a barbell back squat with focused strength, on the right on a stationary bike doing high-intensity intervals. Both frames equal energy. Clean modern gym, natural light." + STYLE),
    ("norwegian-training-method-vo2max",
     "Dramatic winter training scene of a Nordic cross-country skier in cold misty conditions, powerful stride, focused expression, snow-dusted pine landscape behind. Discipline of world-class endurance." + STYLE),
    ("test-vo2max-at-home",
     "Runner mid-stride on an outdoor running track in morning sunlight, shot from the side, GPS sport watch visible on the wrist, tape measure faintly visible at the trackside. Motivational, real-effort, self-testing feeling." + STYLE),
    ("vo2max-after-40",
     "Fit woman in her mid-fifties on a road bike in an autumn landscape with golden leaves, strong and vital, glowing with outdoor light, real and athletic, not model-perfect." + STYLE),
    ("lactate-not-the-enemy",
     "Striking scientific illustration of muscle cells producing glowing orange particles that travel through the bloodstream toward heart and brain cells which absorb them. Beautiful cellular biology aesthetic, warm amber and red tones." + ILLUSTRATION_STYLE),
    ("vo2max-brain-health-bdnf",
     "Beautiful brain illustration with luminous networks of neurons, some areas lit up brightly in blue-white, showing increased neural connectivity after exercise. Scientific but emotionally striking, deep blues and bright accents." + ILLUSTRATION_STYLE),
    ("exercise-snacks-vo2max",
     "Close-up photo of a person's legs in business casual clothes taking office-building stairs two at a time at vigorous pace, motion blur on the legs, modern stairwell. Real, normal, achievable effort." + STYLE),
    ("insulin-resistance-vo2max",
     "Scientific microscopic-style illustration of a muscle cell with receptors on the surface, some glowing green and others glowing blue, showing two pathways for glucose uptake. Accessible labeling-free scientific illustration with cool and warm color contrast." + ILLUSTRATION_STYLE),
]


def submit_flux(prompt: str) -> str:
    r = requests.post(
        "https://queue.fal.run/fal-ai/flux/dev",
        headers={"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"},
        json={
            "prompt": prompt,
            "image_size": {"width": 1216, "height": 688},
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


def compress_to_jpeg(raw_bytes: bytes, max_bytes: int = 160_000, target_size=(1200, 675)) -> bytes:
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
    return f"https://calculatorsites.b-cdn.net/{BUNNY_FOLDER}/{filename}"


def main():
    only = set(sys.argv[1:]) if len(sys.argv) > 1 else None
    successes, failures = [], []
    for slug, prompt in PROMPTS:
        if only and slug not in only:
            continue
        print(f"[{slug}] generating...", flush=True)
        try:
            status_url, response_url = submit_flux(prompt)
            image_url = poll(status_url, response_url)
            raw = requests.get(image_url, timeout=60).content
            jpeg = compress_to_jpeg(raw)
            cdn_url = bunny_upload(f"{slug}.jpg", jpeg)
            print(f"  -> {cdn_url} ({len(jpeg)//1024} KB)", flush=True)
            successes.append((slug, cdn_url, len(jpeg)))
        except Exception as e:
            print(f"  FAILED: {e}", flush=True)
            failures.append((slug, str(e)))
    print()
    print(f"Done. {len(successes)} ok, {len(failures)} failed.")
    for s, url, size in successes:
        print(f"  OK  {s}  {size//1024}KB")
    for s, err in failures:
        print(f"  FAIL {s}: {err}")


if __name__ == "__main__":
    main()
