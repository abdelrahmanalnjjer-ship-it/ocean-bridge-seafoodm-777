from pathlib import Path
import shutil
import sys

SOURCE_DIR = Path(r"C:\Users\DELL 5570\Downloads\Ocean brage product")
DEST_DIR = Path(r"c:\Users\DELL 5570\OneDrive\Documents\GitHub\ocean-bridge-seafoodm-777\public\product-images")

CANONICAL_NAMES = [
    "seafood-01-amberjack-yellowtail.jpg",
    "seafood-02-yellowfin-tuna.jpg",
    "seafood-03-longtail-tuna.jpg",
    "seafood-04-bigeye-tuna.jpg",
    "seafood-05-skipjack-tuna.jpg",
    "seafood-06-spanish-mackerel.jpg",
    "seafood-07-mahi-mahi.jpg",
    "seafood-08-barracuda.jpg",
    "seafood-09-cobia.jpg",
    "seafood-10-grouper.jpg",
    "seafood-11-emperor.jpg",
    "seafood-12-red-snapper.jpg",
    "seafood-13-malabar-blood-snapper.jpg",
    "seafood-14-black-sea-bream.jpg",
    "seafood-15-longspine-seabream.jpg",
    "seafood-16-silver-pomfret.jpg",
    "seafood-17-black-pomfret.jpg",
    "seafood-18-grey-mullet.jpg",
    "seafood-19-sea-catfish.jpg",
    "seafood-20-lizardfish.jpg",
    "seafood-21-indian-oil-sardine.jpg",
    "seafood-22-goldstripe-sardinella.jpg",
    "seafood-23-indian-mackerel.jpg",
    "seafood-24-horse-mackerel-scad.jpg",
    "seafood-25-yellowstripe-scad.jpg",
    "seafood-26-cuttlefish.jpg",
    "seafood-27-squid.jpg",
    "seafood-28-octopus.jpg",
    "seafood-29-rock-lobster.jpg",
    "seafood-30-slipper-lobster.jpg",
    "seafood-31-tiger-prawn.jpg",
    "seafood-32-white-prawn.jpg",
    "seafood-33-ribbonfish-hairtail.jpg",
    "seafood-34-cero-spotted-seer.jpg",
    "seafood-35-sailfish.jpg",
]


def main() -> None:
    if not SOURCE_DIR.exists():
        print(f"Source folder not found: {SOURCE_DIR}", file=sys.stderr)
        sys.exit(1)

    DEST_DIR.mkdir(parents=True, exist_ok=True)

    image_files = sorted(
        [p for p in SOURCE_DIR.iterdir() if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff"}],
        key=lambda p: p.name.lower(),
    )

    if len(image_files) < len(CANONICAL_NAMES):
        print(
            f"Found {len(image_files)} images in source folder, but need {len(CANONICAL_NAMES)} names.",
            file=sys.stderr,
        )
        sys.exit(1)

    for index, source_file in enumerate(image_files[:len(CANONICAL_NAMES)], start=1):
        dest_name = CANONICAL_NAMES[index - 1]
        dest_path = DEST_DIR / dest_name
        shutil.copy2(source_file, dest_path)
        print(f"{index:02d}. {source_file.name} -> {dest_path.name}")

    print(f"\nCopied {min(len(image_files), len(CANONICAL_NAMES))} files to {DEST_DIR}")


if __name__ == "__main__":
    main()
