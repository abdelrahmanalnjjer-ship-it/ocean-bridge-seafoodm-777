export type Category = "tuna" | "pelagic" | "demersal" | "cephalopod";
export type SizeType = "weight_per_piece_kg" | "pieces_per_kg" | "weight_per_tail_kg";
export type Status = "Available" | "Seasonal";

export interface Species {
  id: number;
  slug: string;
  name_en: string;
  name_ar: string;
  name_ar_om: string;
  name_zh: string;
  scientific: string;
  hs_code: string;
  size_type: SizeType;
  sizes: string[];
  status: Status;
  season_start: string;
  season_end: string;
  category: Category;
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const raw: Omit<Species, "slug">[] = [
  { id: 1, name_en: "Amberjack", name_ar_om: "والدو", name_ar: "أمبرجاك", name_zh: "章红鱼 / 红甘鱼", scientific: "Seriola dumerili", hs_code: "0302.99", size_type: "weight_per_piece_kg", sizes: ["2-4kg","4-6kg","6kg+"], status: "Seasonal", season_start: "May", season_end: "Oct", category: "pelagic" },
  { id: 2, name_en: "Yellowfin Tuna", name_ar_om: "كَنعَد", name_ar: "تونة صفراء الزعانف", name_zh: "黄鳍金枪鱼", scientific: "Thunnus albacares", hs_code: "0302.32", size_type: "weight_per_piece_kg", sizes: ["10-20kg","20-30kg","30-40kg","40kg+"], status: "Available", season_start: "Oct", season_end: "Apr", category: "tuna" },
  { id: 3, name_en: "Longtail Tuna", name_ar_om: "حور", name_ar: "تونة طويلة الذيل", name_zh: "青干金枪鱼", scientific: "Thunnus tonggol", hs_code: "0302.35", size_type: "weight_per_piece_kg", sizes: ["10-20kg","20-30kg","30kg+"], status: "Available", season_start: "Oct", season_end: "Apr", category: "tuna" },
  { id: 4, name_en: "Bigeye Tuna", name_ar_om: "حنّون", name_ar: "تونة كبيرة العين", name_zh: "大眼金枪鱼", scientific: "Thunnus obesus", hs_code: "0302.39", size_type: "weight_per_piece_kg", sizes: ["20-40kg","40-60kg","60kg+"], status: "Available", season_start: "Oct", season_end: "Apr", category: "tuna" },
  { id: 5, name_en: "Skipjack Tuna", name_ar_om: "غزال / بونيتو", name_ar: "تونة وثّابة", name_zh: "鲣鱼", scientific: "Katsuwonus pelamis", hs_code: "0302.31", size_type: "weight_per_piece_kg", sizes: ["1-2kg","2-3kg","3-5kg","5kg+"], status: "Available", season_start: "May", season_end: "Sep", category: "tuna" },
  { id: 6, name_en: "Kingfish / Spanish Mackerel", name_ar_om: "خبط", name_ar: "إسقمري ملكي", name_zh: "马鲛鱼", scientific: "Scomberomorus commerson", hs_code: "0302.69", size_type: "weight_per_piece_kg", sizes: ["2-4kg","4-6kg","6kg+"], status: "Available", season_start: "Jan", season_end: "May", category: "pelagic" },
  { id: 7, name_en: "Mahi Mahi / Dorado", name_ar_om: "أنفالوس / دلفين", name_ar: "سمك الدلفين", name_zh: "鲯鳅", scientific: "Coryphaena hippurus", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["1-2kg","2-3kg","3-5kg","5kg+"], status: "Available", season_start: "May", season_end: "Oct", category: "pelagic" },
  { id: 8, name_en: "Barracuda", name_ar_om: "جَدّ", name_ar: "براكودا / سمك السيف المسنن", name_zh: "金梭鱼", scientific: "Sphyraena barracuda", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["2-4kg","4-6kg","6kg+"], status: "Available", season_start: "May", season_end: "Oct", category: "pelagic" },
  { id: 9, name_en: "Cobia", name_ar_om: "كوبيه / سمك أسود", name_ar: "كوبيه أسود", name_zh: "军曹鱼", scientific: "Rachycentron canadum", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["3-6kg","6-10kg","10kg+"], status: "Seasonal", season_start: "May", season_end: "Oct", category: "pelagic" },
  { id: 10, name_en: "Grouper / Hamour", name_ar_om: "هامور", name_ar: "هامور", name_zh: "石斑鱼", scientific: "Epinephelus sp.", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["1-2kg","2-4kg","4kg+"], status: "Available", season_start: "Oct", season_end: "Apr", category: "demersal" },
  { id: 11, name_en: "Emperor Fish / Sherry", name_ar_om: "شِري / جِمة", name_ar: "شري / إمبراطور", name_zh: "龙占鱼", scientific: "Lethrinus sp.", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["0.5-1kg","1-2kg","2kg+"], status: "Available", season_start: "Sep", season_end: "Mar", category: "demersal" },
  { id: 12, name_en: "Red Snapper", name_ar_om: "شِري أحمر / سنابور", name_ar: "شِري أحمر", name_zh: "红鲷鱼", scientific: "Lutjanus sp.", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["1-2kg","2-4kg","4kg+"], status: "Available", season_start: "Oct", season_end: "Apr", category: "demersal" },
  { id: 13, name_en: "Malabar Blood Snapper", name_ar_om: "شِري مالاباري", name_ar: "شِري ملاباري", name_zh: "马拉巴血鲷", scientific: "Lutjanus malabaricus", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["2-4kg","4-6kg","6kg+"], status: "Available", season_start: "Oct", season_end: "Apr", category: "demersal" },
  { id: 14, name_en: "Sea Bream / Black-Seabream", name_ar_om: "صافي / نقور", name_ar: "أسهم بحر / دنيس", name_zh: "黑鲷 / 鲷鱼", scientific: "Acanthopagrus sp.", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["0.5-1kg","1-2kg","2kg+"], status: "Available", season_start: "Oct", season_end: "Apr", category: "demersal" },
  { id: 15, name_en: "King Soldierbream / Kof", name_ar_om: "كوف", name_ar: "كوف ملكي", name_zh: "长棘鲷", scientific: "Argyrops spinifer", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["0.5-1kg","1-2kg","2kg+"], status: "Available", season_start: "Oct", season_end: "Apr", category: "demersal" },
  { id: 16, name_en: "Silver Pomfret", name_ar_om: "زبيدي فضي", name_ar: "زبيدي فضي", name_zh: "银鲳", scientific: "Pampus argenteus", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["0.3-0.5kg","0.5-0.8kg","0.8kg+"], status: "Seasonal", season_start: "Oct", season_end: "Mar", category: "demersal" },
  { id: 17, name_en: "Black Pomfret", name_ar_om: "زبيدي أسود", name_ar: "زبيدي أسود", name_zh: "黑鲳", scientific: "Parastromateus niger", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["0.5-1kg","1-2kg","2kg+"], status: "Seasonal", season_start: "Oct", season_end: "Mar", category: "demersal" },
  { id: 18, name_en: "Grey Mullet", name_ar_om: "بياح / غنّام", name_ar: "بياح رمادي", name_zh: "灰鲻鱼", scientific: "Mugil cephalus", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["1-2kg","2-4kg","4kg+"], status: "Available", season_start: "Sep", season_end: "Feb", category: "demersal" },
  { id: 19, name_en: "Catfish (Marine)", name_ar_om: "قِراض / سمك البقر", name_ar: "قِراض بحري", name_zh: "海鲶鱼", scientific: "Arius sp.", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["1-2kg","2-4kg","4kg+"], status: "Available", season_start: "Oct", season_end: "Mar", category: "demersal" },
  { id: 20, name_en: "Lizardfish", name_ar_om: "أم رقيبة", name_ar: "سمك السحالي", name_zh: "狗母鱼", scientific: "Saurida sp.", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["0.2-0.4kg","0.4-0.6kg","0.6kg+"], status: "Available", season_start: "Sep", season_end: "Mar", category: "demersal" },
  { id: 21, name_en: "Indian Oil Sardine", name_ar_om: "سردين هندي", name_ar: "سردين هندي", name_zh: "印度油鲱", scientific: "Sardinella longiceps", hs_code: "0302.41", size_type: "pieces_per_kg", sizes: ["8/10","10/12","12/15","15/20"], status: "Seasonal", season_start: "May", season_end: "Oct", category: "pelagic" },
  { id: 22, name_en: "Goldstripe Sardinella", name_ar_om: "سردين ذهبي الخط", name_ar: "سردين ذهبي الخط", name_zh: "金带小沙丁鱼", scientific: "Sardinella gibbosa", hs_code: "0302.41", size_type: "pieces_per_kg", sizes: ["15/20","20/30","30/40"], status: "Seasonal", season_start: "May", season_end: "Oct", category: "pelagic" },
  { id: 23, name_en: "Indian Mackerel", name_ar_om: "يرفة / لافاني", name_ar: "إسقمري هندي", name_zh: "印度鲭鱼", scientific: "Rastrelliger kanagurta", hs_code: "0302.70", size_type: "pieces_per_kg", sizes: ["4/6","6/8","8/10","10/12"], status: "Available", season_start: "May", season_end: "Sep", category: "pelagic" },
  { id: 24, name_en: "Horse Mackerel", name_ar_om: "جاميس", name_ar: "جاموس بحري", name_zh: "竹荚鱼", scientific: "Trachurus sp.", hs_code: "0302.89", size_type: "pieces_per_kg", sizes: ["4/6","6/8","8/10","10/12"], status: "Available", season_start: "May", season_end: "Sep", category: "pelagic" },
  { id: 25, name_en: "Yellowstripe Scad", name_ar_om: "مورو / سكاد", name_ar: "سكاد أصفر الخط", name_zh: "黄条竹夹鱼", scientific: "Decapterus sp.", hs_code: "0302.89", size_type: "pieces_per_kg", sizes: ["10/12","12/14","14/16","16/20"], status: "Seasonal", season_start: "May", season_end: "Sep", category: "pelagic" },
  { id: 26, name_en: "Cuttlefish", name_ar_om: "حبار", name_ar: "حبار", name_zh: "墨鱼", scientific: "Sepia pharaonis", hs_code: "0307.41", size_type: "weight_per_piece_kg", sizes: ["0.5-1kg","1-2kg","2kg+"], status: "Available", season_start: "Oct", season_end: "Apr", category: "cephalopod" },
  { id: 27, name_en: "Squid / Calamari", name_ar_om: "نَغار / حبار", name_ar: "حبار / كالاماري", name_zh: "鱿鱼", scientific: "Sepioteuthis sp.", hs_code: "0307.42", size_type: "weight_per_piece_kg", sizes: ["0.3-0.5kg","0.5-1kg","1kg+"], status: "Available", season_start: "Oct", season_end: "Apr", category: "cephalopod" },
  { id: 28, name_en: "Octopus", name_ar_om: "قَدّ / أخطبوط", name_ar: "أخطبوط", name_zh: "章鱼", scientific: "Octopus vulgaris", hs_code: "0307.51", size_type: "weight_per_piece_kg", sizes: ["1-2kg","2-3kg","3kg+"], status: "Available", season_start: "Oct", season_end: "Apr", category: "cephalopod" },
  { id: 29, name_en: "Spiny Lobster / Rock Lobster", name_ar_om: "غِلاس", name_ar: "جراد البحر الشوكي", name_zh: "岩龙虾", scientific: "Panulirus ornatus", hs_code: "0306.11", size_type: "weight_per_tail_kg", sizes: ["0.3-0.5kg","0.5-0.8kg","0.8kg+"], status: "Seasonal", season_start: "Oct", season_end: "Apr", category: "cephalopod" },
  { id: 30, name_en: "Slipper Lobster", name_ar_om: "غِلاس طين / مجذاف", name_ar: "جراد البحر المجدافي", name_zh: "拖鞋龙虾", scientific: "Thenus sp.", hs_code: "0306.12", size_type: "weight_per_tail_kg", sizes: ["0.2-0.4kg","0.4-0.6kg","0.6kg+"], status: "Seasonal", season_start: "Oct", season_end: "Apr", category: "cephalopod" },
  { id: 31, name_en: "Tiger Prawn", name_ar_om: "جمبري / روبيان", name_ar: "روبيان نحمر", name_zh: "虎虾", scientific: "Penaeus monodon", hs_code: "0306.17", size_type: "pieces_per_kg", sizes: ["10/15","15/20","20/30","30/40"], status: "Seasonal", season_start: "Sep", season_end: "Nov", category: "cephalopod" },
  { id: 32, name_en: "White Shrimp", name_ar_om: "روبيان أبيض", name_ar: "روبيان أبيض", name_zh: "白虾", scientific: "Penaeus indicus", hs_code: "0306.17", size_type: "pieces_per_kg", sizes: ["20/30","30/40","40/50","50/60"], status: "Available", season_start: "Sep", season_end: "Nov", category: "cephalopod" },
  { id: 33, name_en: "Ribbon Fish", name_ar_om: "سمك الحزام / سيف", name_ar: "سمك الشريط", name_zh: "带鱼", scientific: "Trichiurus lepturus", hs_code: "0303.89", size_type: "weight_per_piece_kg", sizes: ["0.3-0.5kg","0.5-0.8kg","0.8kg+"], status: "Available", season_start: "Oct", season_end: "Mar", category: "pelagic" },
  { id: 34, name_en: "Wahoo", name_ar_om: "واهو / كمارة", name_ar: "واهاو", name_zh: "刺鲅", scientific: "Acanthocybium solandri", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["10-20kg","20-30kg","30kg+"], status: "Seasonal", season_start: "May", season_end: "Oct", category: "pelagic" },
  { id: 35, name_en: "Sailfish / Marlin", name_ar_om: "شُراع / مرلين", name_ar: "سمك الشراع / مارلين", name_zh: "旗鱼", scientific: "Istiophorus sp.", hs_code: "0302.89", size_type: "weight_per_piece_kg", sizes: ["20-40kg","40-60kg","60kg+"], status: "Seasonal", season_start: "Oct", season_end: "Apr", category: "pelagic" },
];

export const SPECIES: Species[] = raw.map((s) => ({ ...s, slug: slug(s.name_en) }));

export const CATEGORIES: { id: Category; label_en: string; label_ar: string; label_zh: string }[] = [
  { id: "pelagic", label_en: "Pelagic", label_ar: "أسماك سطحية", label_zh: "远洋鱼" },
  { id: "demersal", label_en: "Demersal & Reef", label_ar: "قاعية وصخرية", label_zh: "底层与礁石鱼" },
  { id: "cephalopod", label_en: "Cephalopods & Crustaceans", label_ar: "رأسيات القدم والقشريات", label_zh: "头足类与甲壳类" },
  { id: "tuna", label_en: "Tuna", label_ar: "تونة", label_zh: "金枪鱼" },
];