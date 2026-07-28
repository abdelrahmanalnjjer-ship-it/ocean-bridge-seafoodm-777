export interface Species {
  id: number;
  slug: string;
  name_en: string;
  name_ar_om: string;
  name_ar: string;
  name_zh: string;
  scientific: string;
  hs_code: string;
  size_type: string;
  sizes: string;
  status: string;
  season_start: string;
  season_end: string;
  category: "pelagic" | "tuna" | "demersal" | "cephalopod";
  image: string;
  alt: string;
  caption: string;
  origin: string;
  freezingMethod: string;
  grade: string;
}

const ST: Record<string, string> = { 
  w: "weight_per_piece_kg", 
  p: "pieces_per_kg", 
  t: "weight_per_tail_kg" 
};

const S: Record<string, string> = { 
  A: "Available", 
  S: "Seasonal" 
};

const freezingMethodByCategory: Record<string, string> = {
  pelagic: "IQF / Sea-Frozen / Land-Frozen",
  tuna: "Super-Frozen (-60°C) / Air-Freight / Land-Frozen",
  demersal: "IQF / Block Frozen",
  cephalopod: "IQF / Block Frozen",
};

const slugify = (text: string) => 
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

type SpeciesTuple = [
  id: number,
  name_en: string,
  name_ar_om: string,
  name_ar: string,
  name_zh: string,
  scientific: string,
  hs_code: string,
  size_type: string,
  sizes: string,
  status: string,
  season_start: string,
  season_end: string,
  category: "pelagic" | "tuna" | "demersal" | "cephalopod",
  filename: string,
  caption: string
];

const items: SpeciesTuple[] = [
  [1,"Amberjack","والدو","أمبرجاك","章红鱼 / 红甘鱼","Seriola dumerili","0302.99","w","2-4kg, 4-6kg, 6kg+","S","May","Oct","pelagic","seafood-01-amberjack-yellowtail.jpg","Premium whole amberjack — sashimi & grill grade."],
  [2,"Yellowfin Tuna","كَنعَد","تونة صفراء الزعانف","黄鳍金枪鱼","Thunnus albacares","0302.32","w","10-20kg, 20-30kg, 30-40kg, 40kg+","A","Oct","Apr","tuna","seafood-02-yellowfin-tuna.jpg","Whole yellowfin tuna — line-caught, sashimi grade."],
  [3,"Longtail Tuna","حور","تونة طويلة الذيل","青干金枪鱼","Thunnus tonggol","0302.35","w","10-20kg, 20-30kg, 30kg+","A","Oct","Apr","tuna","seafood-03-longtail-tuna.jpg","Whole longtail tuna — lean, firm red flesh."],
  [4,"Bigeye Tuna","حنّون","تونة كبيرة العين","大眼金枪鱼","Thunnus obesus","0302.39","w","20-40kg, 40-60kg, 60kg+","A","Oct","Apr","tuna","seafood-04-bigeye-tuna.jpg","Whole bigeye tuna — rich, deep-red sashimi grade."],
  [5,"Skipjack Tuna","غزال / بونيتو","تونة وثّابة","鲣鱼","Katsuwonus pelamis","0302.31","w","1-2kg, 2-3kg, 3-5kg, 5kg+","A","May","Sep","tuna","seafood-05-skipjack-tuna.jpg","Whole skipjack tuna — bold flavour, bonito & tataki."],
  [6,"Kingfish / Spanish Mackerel","خبط","إسقمري ملكي","马鲛鱼","Scomberomorus commerson","0302.69","w","2-4kg, 4-6kg, 6kg+","A","Jan","May","pelagic","seafood-06-spanish-mackerel.jpg","Whole Spanish mackerel — firm, oily, grill-ready."],
  [7,"Mahi Mahi / Dorado","أنفالوس / دلفين","سمك الدلفين","鲯鳅","Coryphaena hippurus","0302.89","w","1-2kg, 2-3kg, 3-5kg, 5kg+","A","May","Oct","pelagic","seafood-07-mahi-mahi.jpg","Whole mahi-mahi — mild, lean, vibrant skin."],
  [8,"Barracuda","جَدّ","براكودا / سمك السيف المسنن","金梭鱼","Sphyraena barracuda","0302.89","w","2-4kg, 4-6kg, 6kg+","A","May","Oct","pelagic","seafood-08-barracuda.jpg","Whole barracuda — firm white flesh, steaks & curry."],
  [9,"Cobia","كوبيه / سمك أسود","كوبيه أسود","军曹鱼","Rachycentron canadum","0302.89","w","3-6kg, 6-10kg, 10kg+","S","May","Oct","pelagic","seafood-09-cobia.jpg","Whole cobia — buttery, steak-cut friendly."],
  [10,"Grouper / Hamour","هامور","هامور","石斑鱼","Epinephelus sp.","0302.89","w","1-2kg, 2-4kg, 4kg+","A","Oct","Apr","demersal","seafood-10-grouper.jpg","Whole grouper — delicate white flesh, premium banquet fish."],
  [11,"Emperor Fish / Sherry","شِري / جِمة","شري / إمبراطور","龙占鱼","Lethrinus sp.","0302.89","w","0.5-1kg, 1-2kg, 2kg+","A","Sep","Mar","demersal","seafood-11-emperor.jpg","Whole emperor — sweet firm flesh, reef favourite."],
  [12,"Red Snapper","شِري أحمر / سنابور","شِري أحمر","红鲷鱼","Lutjanus sp.","0302.89","w","1-2kg, 2-4kg, 4kg+","A","Oct","Apr","demersal","seafood-12-red-snapper.jpg","Whole red snapper — classic premium table fish."],
  [13,"Malabar Blood Snapper","شِري مالاباري","شِري ملاباري","马拉巴血鲷","Lutjanus malabaricus","0302.89","w","2-4kg, 4-6kg, 6kg+","A","Oct","Apr","demersal","seafood-13-malabar-blood-snapper.jpg","Whole Malabar blood snapper — deep-red, fine-flaked."],
  [14,"Sea Bream / Black-Seabream","صافي / نقور","أسهم بحر / دنيس","黑鲷 / 鲷鱼","Acanthopagrus sp.","0302.89","w","0.5-1kg, 1-2kg, 2kg+","A","Oct","Apr","demersal","seafood-14-black-sea-bream.jpg","Whole black sea bream — firm, savoury, whole-grill."],
  [15,"Longspine Seabream","كوف","كوف ملكي","长棘鲷","Evynnis spp.","0302.89","w","0.5-1kg, 1-2kg, 2kg+","A","Oct","Apr","demersal","seafood-15-longspine-seabream.jpg","Whole longspine seabream — rosy, delicate, steam-ready."],
  [16,"Silver Pomfret","زبيدي فضي","زبيدي فضي","银鲳","Pampus argenteus","0302.89","w","0.3-0.5kg, 0.5-0.8kg, 0.8kg+","S","Oct","Mar","demersal","seafood-16-silver-pomfret.jpg","Whole silver pomfret — fine-boned, buttery, pan-fry."],
  [17,"Black Pomfret","زبيدي أسود","زبيدي أسود","黑鲳","Parastromateus niger","0302.89","w","0.5-1kg, 1-2kg, 2kg+","S","Oct","Mar","demersal","seafood-17-black-pomfret.jpg","Whole black pomfret — meaty, rich, grill & fry."],
  [18,"Grey Mullet","بياح / غنّام","بياح رمادي","灰鲻鱼","Mugil cephalus","0302.89","w","1-2kg, 2-4kg, 4kg+","A","Sep","Feb","demersal","seafood-18-grey-mullet.jpg","Whole grey mullet — firm, full-flavoured, coastal staple."],
  [19,"Catfish (Marine)","قِراض / سمك البقر","قِراض بحري","海鲶鱼","Arius sp.","0302.89","w","1-2kg, 2-4kg, 4kg+","A","Oct","Mar","demersal","seafood-19-sea-catfish.jpg","Whole sea catfish — soft, gelatinous, curry & stew."],
  [20,"Lizardfish","أم رقيبة","سمك السحالي","狗母鱼","Saurida sp.","0302.89","w","0.2-0.4kg, 0.4-0.6kg, 0.6kg+","A","Sep","Mar","demersal","seafood-20-lizardfish.jpg","Whole lizardfish — surimi & fish-ball base, firm."],
  [21,"Indian Oil Sardine","سردين هندي","سردين هندي","印度油鲱","Sardinella longiceps","0302.41","p","8/10, 10/12, 12/15, 15/20","S","May","Oct","pelagic","seafood-21-indian-oil-sardine.jpg","Whole Indian oil sardine — oily, omega-rich, fry & can."],
  [22,"Goldstripe Sardinella","سردين ذهبي الخط","سردين ذهبي الخط","金带小沙丁鱼","Sardinella gibbosa","0302.41","p","15/20, 20/30, 30/40","S","May","Oct","pelagic","seafood-22-goldstripe-sardinella.jpg","Whole goldstripe sardinella — small, oily, fry & bait."],
  [23,"Indian Mackerel","يرفة / لافاني","إسقمري هندي","印度鲭鱼","Rastrelliger kanagurta","0302.70","p","4/6, 6/8, 8/10, 10/12","A","May","Sep","pelagic","seafood-23-indian-mackerel.jpg","Whole Indian mackerel — oily, flavourful, grill & fry."],
  [24,"Horse Mackerel","جاميس","جاموس بحري","竹荚鱼","Trachurus sp.","0302.89","p","4/6, 6/8, 8/10, 10/12","A","May","Sep","pelagic","seafood-24-horse-mackerel-scad.jpg","Whole horse mackerel / scad — lean, umami, fry & salt-grill."],
  [25,"Yellowstripe Scad","مورو / سكاد","سكاد أصفر الخط","黄条竹夹鱼","Selaroides leptolepis","0302.89","p","10/12, 12/14, 14/16, 16/20","S","May","Sep","pelagic","seafood-25-yellowstripe-scad.jpg","Whole yellowstripe scad — small, sweet, fry & crisp."],
  [26,"Cuttlefish","حبار","حبار","墨鱼","Sepia pharaonis","0307.41","w","0.5-1kg, 1-2kg, 2kg+","A","Oct","Apr","cephalopod","seafood-26-cuttlefish.jpg","Whole cuttlefish — sweet, tender, stir-fry & grill."],
  [27,"Squid / Calamari","نَغار / حبار","حبار / كالاماري","鱿鱼","Sepioteuthis sp.","0307.42","w","0.3-0.5kg, 0.5-1kg, 1kg+","A","Oct","Apr","cephalopod","seafood-27-squid.jpg","Whole squid — clean, mild, rings & whole-grill."],
  [28,"Octopus","قَدّ / أخطبوط","أخطبوط","章鱼","Octopus vulgaris","0307.51","w","1-2kg, 2-3kg, 3kg+","A","Oct","Apr","cephalopod","seafood-28-octopus.jpg","Whole octopus — tender, char-grill & salad."],
  [29,"Spiny Lobster / Rock Lobster","غِلاس","جراد البحر الشوكي","岩龙虾","Panulirus ornatus","0306.11","t","0.3-0.5kg, 0.5-0.8kg, 0.8kg+","S","Oct","Apr","cephalopod","seafood-29-rock-lobster.jpg","Whole rock lobster — sweet tail meat, premium shell-on."],
  [30,"Slipper Lobster","غِلاس طين / مجذاف","جراد البحر المجدافي","拖鞋龙虾","Thenus sp.","0306.12","t","0.2-0.4kg, 0.4-0.6kg, 0.6kg+","S","Oct","Apr","cephalopod","seafood-30-slipper-lobster.jpg","Whole slipper lobster — firm sweet meat, flat-shell."],
  [31,"Tiger Prawn","جمبري / روبيان","روبيان أحمر","虎虾","Penaeus monodon","0306.17","p","10/15, 15/20, 20/30, 30/40","S","Sep","Nov","cephalopod","seafood-31-tiger-prawn.jpg","Whole tiger prawn — jumbo, striped, grill & curry."],
  [32,"White Shrimp","روبيان أبيض","روبيان أبيض","白虾","Penaeus indicus","0306.17","p","20/30, 30/40, 40/50, 50/60","A","Sep","Nov","cephalopod","seafood-32-white-prawn.jpg","Whole white prawn — sweet, versatile, all-purpose."],
  [33,"Ribbon Fish","سمك الحزام / سيف","سمك الشريط","带鱼","Trichiurus lepturus","0303.89","w","0.3-0.5kg, 0.5-0.8kg, 0.8kg+","A","Oct","Mar","demersal","seafood-33-ribbonfish-hairtail.jpg","Whole ribbonfish / hairtail — silvery, firm, fry & braise."],
  [34,"Wahoo","واوه / كمارة","واهاو","刺鲅","Acanthocybium solandri","0302.89","w","10-20kg, 20-30kg, 30kg+","S","May","Oct","pelagic","seafood-34-cero-spotted-seer.jpg","Whole cero / spotted seer — meaty, steaks & curry."],
  [35,"Sailfish / Marlin","شُراع / مرلين","سمك الشراع / مارلين","旗鱼","Istiophorus sp.","0302.89","w","20-40kg, 40-60kg, 60kg+","S","Oct","Apr","pelagic","seafood-35-sailfish.jpg","Whole sailfish — firm, steak-cut, grill & smoke."]
];

export const SPECIES: Species[] = items.map(
  ([id, name_en, name_ar_om, name_ar, name_zh, scientific, hs_code, st, sizes, status_code, season_start, season_end, category, filename, caption]) => ({
    id,
    slug: slugify(name_en),
    name_en,
    name_ar_om,
    name_ar,
    name_zh,
    scientific,
    hs_code,
    size_type: ST[st],
    sizes,
    status: S[status_code],
    season_start,
    season_end,
    category,
    image: `/product-images/${filename}`,
    alt: `Fresh whole ${name_en} (${name_zh}) — overhead studio product photo`,
    caption,
    origin: "Oman",
    freezingMethod: freezingMethodByCategory[category] || "IQF / Block Frozen",
    grade: "Export Grade A",
  })
);

export const CATEGORIES = [
  { id: "pelagic", label_en: "Pelagic", label_ar: "أسماك سطحية", label_zh: "远洋鱼类" },
  { id: "demersal", label_en: "Demersal & Reef", label_ar: "قاعية وصخرية", label_zh: "底栖与礁石鱼" },
  { id: "cephalopod", label_en: "Cephalopods & Crustaceans", label_ar: "الرأسقدميات والقشريات", label_zh: "头足类与甲壳类" },
  { id: "tuna", label_en: "Tuna", label_ar: "تونة", label_zh: "金枪鱼" },
] as const;
