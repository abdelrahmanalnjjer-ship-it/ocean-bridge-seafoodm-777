import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "en" | "ar" | "zh";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.products": "Products",
  "nav.vlog": "Vlog",
  "nav.about": "About",
  "nav.contact": "Connect",
  "brand.name": "Ocean Bridge Trade",
  "brand.tagline": "Structured Sourcing. Verified Supply.",
  "hero.headline": "Bridging Origin Markets with Global Processors.",
  "hero.sub": "Structured Sourcing. Verified Supply.",
  "hero.cta.catalog": "Explore Catalogue",
  "hero.cta.contact": "Initiate Inquiry",
  "section.vlog": "Vlog",
  "section.vlog.sub": "News, updates and field reports from origin ports, facility audits and cold-chain operations.",
  "section.capabilities": "Core Competencies",
  "section.species": "Species Portfolio",
  "section.gateways": "Destination Gateways",
  "section.regulatory": "Regulatory Mastery",
  "products.title": "The Institutional Trade Matrix",
  "products.sub": "Transaction-specific, data-driven, season-aware supply lines. No speculative inventory.",
  "products.view.grid": "Visual Grid",
  "products.view.terminal": "Terminal Data",
  "products.request": "Request Spec Sheet",
  "products.season": "Season",
  "products.size": "Size Grade",
  "products.status": "Status",
  "products.hs": "HS",
  "products.pack": "Packaging",
  "products.initiate": "Initiate Inquiry",
  "about.title": "About Ocean Bridge Trade",
  "contact.title": "The Global Trade Desk",
};

const ar: Dict = {
  "nav.home": "الرئيسية",
  "nav.products": "المنتجات",
  "nav.vlog": "المدوّنة",
  "nav.about": "من نحن",
  "nav.contact": "تواصل",
  "brand.name": "أوشن بريدج تريد",
  "brand.tagline": "توريد منظم. إمداد موثق.",
  "hero.headline": "جسر بين أسواق المصدر والمصنعين العالميين.",
  "hero.sub": "توريد منظم. إمداد موثق.",
  "hero.cta.catalog": "استعرض الكتالوج",
  "hero.cta.contact": "ابدأ استفسارًا",
  "section.vlog": "المدوّنة المرئية",
  "section.vlog.sub": "أخبار وتحديثات وتقارير ميدانية من موانئ المصدر وتدقيق المنشآت وسلسلة التبريد.",
  "section.capabilities": "الكفاءات الأساسية",
  "section.species": "محفظة الأنواع",
  "section.gateways": "بوابات الوجهات",
  "section.regulatory": "الإتقان التنظيمي",
  "products.title": "مصفوفة التجارة المؤسسية",
  "products.sub": "خطوط إمداد قائمة على الصفقة والبيانات والموسم.",
  "products.view.grid": "عرض بصري",
  "products.view.terminal": "عرض البيانات",
  "products.request": "اطلب ورقة المواصفات",
  "products.season": "الموسم",
  "products.size": "المقاس",
  "products.status": "الحالة",
  "products.hs": "رمز جمركي",
  "products.pack": "التعبئة",
  "products.initiate": "ابدأ استفسارًا",
  "about.title": "عن أوشن بريدج تريد",
  "contact.title": "مكتب التجارة العالمي",
};

const zh: Dict = {
  "nav.home": "首页",
  "nav.products": "产品",
  "nav.vlog": "视频博客",
  "nav.about": "关于我们",
  "nav.contact": "联系我们",
  "brand.name": "海桥贸易",
  "brand.tagline": "结构化采购。经核实的供应。",
  "hero.headline": "连接原产地市场与全球加工商。",
  "hero.sub": "结构化采购。经核实的供应。",
  "hero.cta.catalog": "浏览目录",
  "hero.cta.contact": "发起询盘",
  "section.vlog": "视频博客",
  "section.vlog.sub": "来自原产港口、工厂审核与冷链作业的新闻与现场报道。",
  "section.capabilities": "核心能力",
  "section.species": "物种组合",
  "section.gateways": "目的地枢纽",
  "section.regulatory": "合规精通",
  "products.title": "机构级贸易矩阵",
  "products.sub": "以交易、数据与季节为核心的供应线,不持有投机库存。",
  "products.view.grid": "视觉网格",
  "products.view.terminal": "终端数据",
  "products.request": "索取规格表",
  "products.season": "季节",
  "products.size": "规格",
  "products.status": "状态",
  "products.hs": "HS 编码",
  "products.pack": "包装",
  "products.initiate": "发起询盘",
  "about.title": "关于海桥贸易",
  "contact.title": "全球贸易台",
};

const DICTS: Record<Locale, Dict> = { en, ar, zh };

interface I18nCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (k: string) => string;
  dir: "ltr" | "rtl";
}

const Ctx = createContext<I18nCtx>({
  locale: "en",
  setLocale: () => {},
  t: (k) => k,
  dir: "ltr",
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("obt.locale") : null;
    if (stored === "en" || stored === "ar" || stored === "zh") setLocaleState(stored);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale === "zh" ? "zh" : locale;
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("obt.locale", l);
  };

  const t = (k: string) => DICTS[locale][k] ?? DICTS.en[k] ?? k;
  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";
  return <Ctx.Provider value={{ locale, setLocale, t, dir }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);