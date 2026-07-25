rename.py
import os
import shutil

source_folder = r"C:\Users\DELL 5570\Downloads\Ocean brage product"
target_folder = r"public\product-images"

new_names = [
    "seafood-01-amberjack-yellowtail.jpg", "seafood-02-yellowfin-tuna.jpg",
    "seafood-03-longtail-tuna.jpg", "seafood-04-bigeye-tuna.jpg",
    "seafood-05-skipjack-tuna.jpg", "seafood-06-spanish-mackerel.jpg",
    "seafood-07-mahi-mahi.jpg", "seafood-08-barracuda.jpg",
    "seafood-09-cobia.jpg", "seafood-10-grouper.jpg",
    "seafood-11-emperor.jpg", "seafood-12-red-snapper.jpg",
    "seafood-13-malabar-blood-snapper.jpg", "seafood-14-black-sea-bream.jpg",
    "seafood-15-longspine-seabream.jpg", "seafood-16-silver-pomfret.jpg",
    "seafood-17-black-pomfret.jpg", "seafood-18-grey-mullet.jpg",
    "seafood-19-sea-catfish.jpg", "seafood-20-lizardfish.jpg",
    "seafood-21-indian-oil-sardine.jpg", "seafood-22-goldstripe-sardinella.jpg",
    "seafood-23-indian-mackerel.jpg", "seafood-24-horse-mackerel-scad.jpg",
    "seafood-25-yellowstripe-scad.jpg", "seafood-26-cuttlefish.jpg",
    "seafood-27-squid.jpg", "seafood-28-octopus.jpg",
    "seafood-29-rock-lobster.jpg", "seafood-30-slipper-lobster.jpg",
    "seafood-31-tiger-prawn.jpg", "seafood-32-white-prawn.jpg",
    "seafood-33-ribbonfish-hairtail.jpg", "seafood-34-cero-spotted-seer.jpg",
    "seafood-35-sailfish.jpg"
]

os.makedirs(target_folder, exist_ok=True)
files = [f for f in os.listdir(source_folder) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
files.sort()

for idx, filename in enumerate(files):
    if idx < len(new_names):
        shutil.copy(os.path.join(source_folder, filename), os.path.join(target_folder, new_names[idx]))

print("Done copying and renaming all 35 images!")