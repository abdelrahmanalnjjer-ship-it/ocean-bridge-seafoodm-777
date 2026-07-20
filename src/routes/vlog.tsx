import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/i18n";
import { VLOG_ARTICLES, type VlogArticle } from "@/data/vlog";

export const Route = createFileRoute("/vlog")({
  head: () => ({
    meta: [
      { title: "Vlog & News — Ocean Bridge Trade" },
      { name: "description", content: "Field reports, trade desk updates, season bulletins and compliance notes from Ocean Bridge Trade." },
      { property: "og:title", content: "Vlog & News — Ocean Bridge Trade" },
      { property: "og:description", content: "Field reports and trade desk updates from Muscat, Oman." },
    ],
  }),
  component: VlogIndex,
});

function pick(a: VlogArticle, locale: string) {
  if (locale === "ar") return { title: a.title_ar, excerpt: a.excerpt_ar, tag: a.tag_ar };
  if (locale === "zh") return { title: a.title_zh, excerpt: a.excerpt_zh, tag: a.tag_zh };
  return { title: a.title_en, excerpt: a.excerpt_en, tag: a.tag_en };
}

function formatDate(iso: string, locale: string) {
  const l = locale === "zh" ? "zh-CN" : locale === "ar" ? "ar" : "en-US";
  return new Date(iso).toLocaleDateString(l, { year: "numeric", month: "long", day: "numeric" });
}

function VlogIndex() {
  const { locale } = useI18n();
  const sorted = [...VLOG_ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <div>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 pt-24 pb-16">
          <div className="text-[11px] uppercase tracking-[0.35em] text-[#C73E1D] mb-6">Vlog · News</div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl">
            {locale === "ar" ? "أخبار وتقارير ميدانية" : locale === "zh" ? "新闻与现场报道" : "News & Field Reports"}
          </h1>
          <p className="mt-8 max-w-2xl text-muted-foreground">
            {locale === "ar"
              ? "تحديثات موجزة من مكتب التجارة، ونشرات موسمية، وملاحظات امتثال، وتقارير من موانئ المصدر."
              : locale === "zh"
                ? "来自贸易台的简要更新、季节公告、合规说明及原产港口的现场报道。"
                : "Concise updates from the trade desk, season bulletins, compliance notes and reports from origin ports."}
          </p>
        </div>
      </section>

      <section className="section-light">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-20">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((a, i) => {
              const { title, excerpt, tag } = pick(a, locale);
              return (
                <motion.div
                  key={a.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                >
                  <Link
                    to="/vlog/$slug"
                    params={{ slug: a.slug }}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={a.image} alt={title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 bg-background/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.25em]">
                        {tag}
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                      <span>{formatDate(a.date, locale)}</span>
                      <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
                    </div>
                    <h2 className="mt-2 font-display text-2xl leading-tight group-hover:text-[#C73E1D] transition-colors">
                      {title}
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}