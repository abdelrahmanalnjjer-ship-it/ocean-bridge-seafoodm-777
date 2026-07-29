## Summary

### Changes made:

1. **src/data/species.ts** - Two safe text-only fixes:
   - Row 15: renamed to Longspine Seabream, scientific changed to Evynnis spp.
   - Row 25: scientific changed to Selaroides leptolepis

2. **src/routes/products.tsx** - Three UI updates:
   - Removed freezing-method (IQF) tag and HS code tag from product cards (fields kept in data)
   - Replaced Available/Seasonal badge with 12-tick month indicator bar
   - Added renderMonthIndicator() function handling wrap-around seasons, year-round display

3. **remap.csv** - Seeded with 10 evidenced rows for product image remapping

4. **remap.py** - Dual-gate script (--dry-run / --commit) to transcode PNG->JPEG and enforce bijection

### Gaps requiring human sign-off:
Slots 01, 06, 21, 22, 24, 28, 34 still need human visual confirmation. Run `python remap.py --dry-run` to see the plan.
