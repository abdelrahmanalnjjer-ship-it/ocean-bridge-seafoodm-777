#!/usr/bin/env python3
"""Product-image remap: transcode PNG-bytes->JPEG, enforce a perfect bijection AND
a human sign-off BEFORE writing, commit atomically with backup.
  python remap.py --dry-run   # verify + print plan, change nothing (blanks allowed)
  python remap.py --commit    # write ONLY if bijection clean AND every human_ok ticked"""
import argparse, csv, glob, os, shutil, subprocess, sys, datetime
IMG="public/product-images"
CANON={1:"amberjack-yellowtail",2:"yellowfin-tuna",3:"longtail-tuna",4:"bigeye-tuna",
 5:"skipjack-tuna",6:"spanish-mackerel",7:"mahi-mahi",8:"barracuda",9:"cobia",
 10:"grouper",11:"emperor",12:"red-snapper",13:"malabar-blood-snapper",14:"black-sea-bream",
 15:"longspine-seabream",16:"silver-pomfret",17:"black-pomfret",18:"grey-mullet",
 19:"sea-catfish",20:"lizardfish",21:"indian-oil-sardine",22:"goldstripe-sardinella",
 23:"indian-mackerel",24:"horse-mackerel-scad",25:"yellowstripe-scad",26:"cuttlefish",
 27:"squid",28:"octopus",29:"rock-lobster",30:"slipper-lobster",31:"tiger-prawn",
 32:"white-prawn",33:"ribbonfish-hairtail",34:"cero-spotted-seer",35:"sailfish"}
tgt=lambda s:f"seafood-{s:02d}-{CANON[s]}.jpg"
OK={"y","yes","✓","1","true","ok"}
def discover():
    s={}
    for p in glob.glob(f"{IMG}/seafood-*"):
        try:n=int(os.path.basename(p).split("-")[1])
        except ValueError:continue
        s[("slot",str(n))]=p
    for p in glob.glob(f"{IMG}/1784*.png"):s[("raw",os.path.basename(p))]=p
    return s
def transcode(src,dst):
    try:
        from PIL import Image
        im=Image.open(src)
        if im.mode in("RGBA","P","LA"):im=im.convert("RGB")
        im.save(dst,"JPEG",quality=84,optimize=True,progressive=True);return
    except ImportError:
        subprocess.run(["magick",src,"-quality","84","-interlace","Plane",dst],check=True)
def main():
    ap=argparse.ArgumentParser();g=ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--dry-run",action="store_true");g.add_argument("--commit",action="store_true")
    ap.add_argument("--csv",default="remap.csv");a=ap.parse_args()
    avail=discover();rows=list(csv.DictReader(open(a.csv)));rows_by_slot={int(r["correct_slot"]):r for r in rows}
    problems,plan,used,seen=[],[],set(),set()
    for r in rows:
        slot=int(r["correct_slot"]);key=(r["source_kind"],r["source_ref"].strip())
        if slot in seen:problems.append(f"slot {slot} listed twice")
        seen.add(slot)
        if slot not in CANON:problems.append(f"unknown slot {slot}");continue
        if key not in avail:problems.append(f"slot {slot}: source {key} NOT on disk");continue
        if key in used:problems.append(f"source {key} used twice (slot {slot})")
        used.add(key);plan.append((slot,avail[key]))
    missing=sorted(set(CANON)-seen)
    if missing:problems.append(f"slots with NO mapping: {missing}")
    unused=sorted(set(avail)-used)
    if len(unused)!=1:problems.append(f"expected exactly 1 unused (discard); found {len(unused)}: {[os.path.basename(avail[u]) for u in unused]}")
    print("=== PLAN ===")
    for s,src in sorted(plan):print(f"  {s:02d} <- {os.path.basename(src):42s} human_ok={rows_by_slot[s].get('human_ok','').strip()!r}")
    if len(unused)==1:print(f"  DISCARD: {os.path.basename(avail[unused[0]])}")
    if problems:
        print("\n*** BIJECTION FAILED — REFUSING ***");[print("  -",p) for p in problems];sys.exit(1)
    print("\nBijection OK (35 slots, unique sources, one discard).")
    unsigned=[s for s,_ in plan if rows_by_slot[s].get("human_ok","").strip().lower() not in OK]
    if a.commit and unsigned:
        print("\n*** HUMAN SIGN-OFF INCOMPLETE — REFUSING TO COMMIT ***")
        for s in unsigned:print(f"  slot {s:02d} -> open generation chat frame {rows_by_slot[s].get('chat_frame','?')}, match photo to repo file, tick human_ok")
        sys.exit(1)
    if a.dry_run:print("Dry-run only; re-run --commit after ticking every human_ok.");return
    stamp=datetime.datetime.now().strftime("%Y%m%d-%H%M%S");bak=f"{IMG}/_backup-{stamp}";tmp=f"{IMG}/_tmp-{stamp}"
    os.makedirs(bak);os.makedirs(tmp)
    for s,src in plan:transcode(src,os.path.join(tmp,tgt(s)))
    for p in glob.glob(f"{IMG}/seafood-*"):shutil.move(p,bak)
    for p in glob.glob(f"{tmp}/seafood-*"):shutil.move(p,IMG)
    shutil.rmtree(tmp)
    print(f"Committed. Originals in {bak}. Now: git add -A && git commit, then visual pass.")
if __name__=="__main__":main()

