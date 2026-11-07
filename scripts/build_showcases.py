"""Build showcase-kit pages and the media manifest consumed by Next.js.

Run from any directory: python scripts/build_showcases.py
The generated HTML, media, and manifest are committed for Vercel builds.
"""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
entries = sorted((ROOT / "showcase").glob("*/showcase.json"))
manifest = {}
for path in entries:
    entry = json.loads(path.read_text(encoding="utf-8"))
    media = entry.get("media", [])
    if sum(m.get("role") == "hero" for m in media) != 1:
        raise ValueError(f"{entry['slug']}: exactly one hero is required")
    items = []
    for item in media:
        if not item.get("caption"):
            raise ValueError(f"{entry['slug']}: media needs a caption")
        converted = dict(item)
        for key in ("src", "poster"):
            if item.get(key):
                source = (path.parent / item[key]).resolve()
                if not source.is_file():
                    raise FileNotFoundError(source)
                converted[key] = f"/showcase/media/{entry['slug']}/{source.name}"
        items.append(converted)
    manifest[entry["slug"]] = items

subprocess.run([
    sys.executable, str(ROOT / "scripts/showcase-kit/build_site.py"),
    "--projects", str(ROOT / "showcase"),
    "--out", str(ROOT / "public/showcase"),
    "--template", str(ROOT / "scripts/showcase-kit/portfolio.html"),
], check=True)
(ROOT / "src/data/showcaseMedia.json").write_text(
    json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)
print(f"Updated galleries for {len(manifest)} projects.")
