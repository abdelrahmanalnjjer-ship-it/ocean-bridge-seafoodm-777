import portImg from "@/assets/port-cranes.jpg.asset.json";
import fishermenImg from "@/assets/fishermen.jpg.asset.json";
import muscatImg from "@/assets/muscat-skyline.jpg.asset.json";
import harborImg from "@/assets/harbor-dusk.jpg.asset.json";
import dhowDetailImg from "@/assets/dhow-detail.jpg.asset.json";

export interface VlogArticle {
  slug: string;
  date: string; // ISO
  image: string;
  title_en: string;
  title_ar: string;
  title_zh: string;
  excerpt_en: string;
  excerpt_ar: string;
  excerpt_zh: string;
  body_en: string[];
  body_ar: string[];
  body_zh: string[];
  tag_en: string;
  tag_ar: string;
  tag_zh: string;
}

export const VLOG_ARTICLES: VlogArticle[] = [
  {
    slug: "muscat-coastline-origin-waters",
    date: "2026-07-12",
    image: portImg.url,
    tag_en: "Field Report",
    tag_ar: "تقرير ميداني",
    tag_zh: "现场报道",
    title_en: "Origin Waters — Muscat Coastline",
    title_ar: "مياه المصدر — ساحل مسقط",
    title_zh: "原产海域 — 马斯喀特海岸",
    excerpt_en: "Documenting first-light landings along the capital coast as the summer pelagic season opens.",
    excerpt_ar: "توثيق عمليات الإنزال عند الفجر على طول ساحل العاصمة مع افتتاح موسم الأسماك السطحية الصيفي.",
    excerpt_zh: "记录夏季远洋鱼季开启之际,首都海岸线上的清晨渔获。",
    body_en: [
      "Ocean Bridge Trade field team spent three days along the Muscat coastline documenting the opening of the summer pelagic season.",
      "Kingfish and amberjack landings from artisanal dhow fleets were graded on the beach and moved through our partner cold-chain within four hours of catch.",
      "This report is part of our ongoing origin-transparency programme, providing international processors with verified evidence of catch-to-plant traceability.",
    ],
    body_ar: [
      "أمضى فريق أوشن بريدج تريد الميداني ثلاثة أيام على ساحل مسقط لتوثيق افتتاح موسم الأسماك السطحية الصيفي.",
      "تم تصنيف كميات الكنعد والوالدو من أساطيل الداو الحرفية على الشاطئ ونقلها عبر سلسلة التبريد الشريكة في غضون أربع ساعات من الصيد.",
      "يأتي هذا التقرير ضمن برنامجنا المستمر لشفافية المصدر، لتزويد المصنعين الدوليين بأدلة موثقة على التتبع من الصيد حتى المصنع.",
    ],
    body_zh: [
      "海桥贸易现场团队在马斯喀特海岸线沿线驻扎三天,记录夏季远洋鱼季的开启。",
      "来自传统单桅帆船船队的马鲛鱼与红甘鱼在岸边完成分级,并在捕捞后四小时内进入我们合作的冷链体系。",
      "本报告是我们持续开展的原产地透明度计划的一部分,为国际加工商提供从捕捞到工厂的可核实追溯证据。",
    ],
  },
  {
    slug: "qingdao-buyer-delegation",
    date: "2026-06-24",
    image: muscatImg.url,
    tag_en: "Trade Desk",
    tag_ar: "مكتب التجارة",
    tag_zh: "贸易台",
    title_en: "Qingdao Buyer Delegation Concludes Muscat Visit",
    title_ar: "وفد المشترين من تشينغداو يختتم زيارته لمسقط",
    title_zh: "青岛买家代表团结束马斯喀特访问",
    excerpt_en: "A four-day audit of processing partners and cold-chain infrastructure with three GACC-registered Chinese processors.",
    excerpt_ar: "تدقيق استمر أربعة أيام لشركاء المعالجة والبنية التحتية للتبريد مع ثلاث شركات صينية مسجلة لدى GACC.",
    excerpt_zh: "对加工合作伙伴及冷链基础设施进行为期四天的审核,涉及三家已获 GACC 注册的中国加工商。",
    body_en: [
      "Three GACC Decree 248-registered processors from Qingdao concluded a four-day facility audit programme in Muscat.",
      "Ocean Bridge Trade coordinated site visits, sample cuttings, and commercial term sheets for the 2026/2027 season.",
      "Initial indicative volumes cover cuttlefish, kingfish and yellowfin tuna, with first containers targeted for Q4 2026.",
    ],
    body_ar: [
      "اختتمت ثلاث شركات معالجة من تشينغداو، مسجلة بموجب المرسوم 248 الصادر عن GACC، برنامج تدقيق للمنشآت في مسقط استمر أربعة أيام.",
      "نسّقت أوشن بريدج تريد الزيارات الميدانية وقصّات العينات وأوراق الشروط التجارية لموسم 2026/2027.",
      "تشمل الأحجام الإرشادية الأولية الحبار والكنعد والتونة صفراء الزعنفة، مع استهداف أول الحاويات في الربع الرابع من 2026.",
    ],
    body_zh: [
      "三家已获 GACC 248 号令注册的青岛加工商在马斯喀特结束了为期四天的工厂审核。",
      "海桥贸易协调了实地考察、样品切割以及 2026/2027 季度的商务条款书。",
      "初步意向货量涵盖墨鱼、马鲛鱼与黄鳍金枪鱼,首批集装箱计划于 2026 年第四季度发运。",
    ],
  },
  {
    slug: "salalah-kingfish-season",
    date: "2026-04-30",
    image: harborImg.url,
    tag_en: "Season Bulletin",
    tag_ar: "نشرة الموسم",
    tag_zh: "季节公告",
    title_en: "Salalah Kingfish Season — Volume & Grade Outlook",
    title_ar: "موسم الكنعد في صلالة — توقعات الحجم والدرجات",
    title_zh: "塞拉莱马鲛鱼季 — 产量与规格展望",
    excerpt_en: "Southern monsoon dynamics point to a stronger 4–8kg grade window through May and June.",
    excerpt_ar: "تشير ديناميكيات الرياح الموسمية الجنوبية إلى نافذة أقوى للدرجة 4–8 كجم خلال مايو ويونيو.",
    excerpt_zh: "南部季风动态显示 5–6 月期间 4–8 公斤规格窗口将更为强劲。",
    body_en: [
      "Preliminary landings from Dhofar suggest a stronger 4–8kg kingfish grade window than the prior year.",
      "We are pre-allocating capacity for processors requiring whole gilled-and-gutted product with tight size uniformity.",
      "Buyers seeking indicative offers for May–August windows should engage the trade desk in the next two weeks.",
    ],
    body_ar: [
      "تشير عمليات الإنزال الأولية في ظفار إلى نافذة أقوى للكنعد بدرجة 4–8 كجم مقارنة بالعام السابق.",
      "نقوم بتخصيص السعة مسبقًا للمصنعين الذين يحتاجون منتجًا كاملًا منزوع الخياشيم والأحشاء بتجانس دقيق في الحجم.",
      "على المشترين الراغبين في عروض إرشادية لنوافذ مايو–أغسطس التواصل مع مكتب التجارة خلال الأسبوعين القادمين.",
    ],
    body_zh: [
      "佐法尔的初步渔获显示,4–8 公斤规格的马鲛鱼窗口较去年更为强劲。",
      "我们正在为需要整鱼去鳃去脏且规格高度一致产品的加工商预先分配产能。",
      "希望获取 5–8 月窗口指示性报价的买家应在未来两周内与贸易台联系。",
    ],
  },
  {
    slug: "gacc-cifer-facility-walkthrough",
    date: "2026-03-18",
    image: fishermenImg.url,
    tag_en: "Compliance",
    tag_ar: "الامتثال",
    tag_zh: "合规",
    title_en: "GACC CIFER Facility Walkthrough",
    title_ar: "جولة تفتيش لمنشأة مسجلة في GACC CIFER",
    title_zh: "GACC CIFER 工厂巡检",
    excerpt_en: "Renewed CIFER registration for a Sohar-based cephalopod processor after a full compliance walkthrough.",
    excerpt_ar: "تجديد تسجيل CIFER لمصنع رأسيات الأرجل في صحار بعد جولة امتثال كاملة.",
    excerpt_zh: "苏哈尔一家头足类加工厂在完成完整合规巡检后,CIFER 注册获续期。",
    body_en: [
      "We supported a Sohar-based cephalopod processor through the renewal of its GACC CIFER registration.",
      "Documentation covered raw material traceability, thermal centre-of-mass validation, and freezer log integrity.",
      "The facility is now cleared for continued cuttlefish and squid supply into mainland China through 2028.",
    ],
    body_ar: [
      "دعمنا مصنع رأسيات الأرجل في صحار خلال تجديد تسجيله في GACC CIFER.",
      "شملت الوثائق تتبع المواد الخام، والتحقق من درجة حرارة المركز الحراري، وسلامة سجلات التجميد.",
      "المنشأة معتمدة الآن لمواصلة توريد الحبار والصبيدج إلى البر الرئيسي الصيني حتى 2028.",
    ],
    body_zh: [
      "我们协助苏哈尔一家头足类加工厂完成 GACC CIFER 注册续期。",
      "文件涵盖原料可追溯性、热中心温度验证及冷冻记录完整性。",
      "该工厂现已获准继续向中国大陆供应墨鱼与鱿鱼,资质有效期至 2028 年。",
    ],
  },
  {
    slug: "traditional-dhow-fleet-landing",
    date: "2026-02-05",
    image: dhowDetailImg.url,
    tag_en: "Field Report",
    tag_ar: "تقرير ميداني",
    tag_zh: "现场报道",
    title_en: "Dhow Fleet — Traditional Landing at Dawn",
    title_ar: "أسطول الداو — إنزال تقليدي عند الفجر",
    title_zh: "单桅帆船船队 — 黎明传统渔获",
    excerpt_en: "Artisanal dhow captains discuss species mix, weather windows, and integration with modern cold-chain nodes.",
    excerpt_ar: "يناقش قباطنة الداو الحرفيون مزيج الأنواع، ونوافذ الطقس، والتكامل مع عقد سلسلة التبريد الحديثة.",
    excerpt_zh: "传统单桅帆船船长讨论鱼种构成、天气窗口以及与现代冷链节点的衔接。",
    body_en: [
      "A morning at a traditional landing point offers a candid view of what modern sourcing must adapt to.",
      "Captains report catch composition on shore; our team grades and routes to the nearest compliant cold-chain node.",
      "This dual-track approach — artisanal at origin, industrial at export — remains the most resilient sourcing model.",
    ],
    body_ar: [
      "يقدّم صباح في نقطة إنزال تقليدية نظرة صريحة على ما يجب على التوريد الحديث التكيّف معه.",
      "يُبلغ القباطنة عن تركيبة الصيد على الشاطئ، ويقوم فريقنا بالتصنيف والتوجيه إلى أقرب عقدة تبريد ممتثلة.",
      "يظل هذا النهج المزدوج — الحرفي عند المصدر والصناعي عند التصدير — النموذج الأكثر مرونة في التوريد.",
    ],
    body_zh: [
      "在传统渔获点度过的一个清晨,让人真实看到现代采购必须适应的现实。",
      "船长在岸上报告渔获构成,我们的团队进行分级并将其送往最近的合规冷链节点。",
      "这种双轨模式 — 原产地传统作业、出口端工业化处理 — 仍是最具韧性的采购模型。",
    ],
  },
];

export function getArticle(slug: string) {
  return VLOG_ARTICLES.find((a) => a.slug === slug);
}