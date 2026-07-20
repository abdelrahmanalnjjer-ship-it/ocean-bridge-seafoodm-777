import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/i18n";
import { getArticle, VLOG_ARTICLES, type VlogArticle } from "@/data/vlog";

export const Route = createFileRoute("/vlog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title_en} — Ocean Bridge Trade` },
        { name: "description", content: a.excerpt_en },
        { property: "og:title", content: a.title_en },
        { property: "og:description", content: a.excerpt_en },
        { property: "og:type", content: "article" },
        { property: "og:image", content: a.image },
        { name: "twitter:image", content: a.image },
      ],
    };
  },
  component: VlogDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-40 text-center">
      <h1 className="font-display text-4xl mb-4">Article not found</h1>
      <Link to="/vlog" className="text-[#C73E1D] underline">Back to Vlog</Link>
    </div>
  ),
});

function pick(a: VlogArticle, locale: string) {
  if (locale === "ar") return { title: a.title_ar, excerpt: a.excerpt_ar, body: a.body_ar, tag: a.tag_ar };
  if (locale === "zh") return { title: a.title_zh, excerpt: a.excerpt_zh, body: a.body_zh, tag: a.tag_zh };
  return { title: a.title_en, excerpt: a.excerpt_en, body: a.body_en, tag: a.tag_en };
}

function formatDate(iso: string, locale: string) {
  const l = locale === "zh" ? "zh-CN" : locale === "ar" ? "ar" : "en-US";
  return new Date(iso).toLocaleDateString(l, { year: "numeric", month: "long", day: "numeric" });
}

function VlogDetail() {
  const { article } = Route.useLoaderData();
  const { locale } = useI18n();
  const { title, excerpt, body, tag } = pick(article, locale);
  const related = VLOG_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article>
      <section className="relative">
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <img src={article.image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06142e]/60 via-[#06142e]/40 to-[#06142e]" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1100px] px-6 lg:px-12 pb-14 text-white">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/80 mb-4">
                <span className="h-px w-8 bg-[#C73E1D]" />
                {tag} · {formatDate(article.date, locale)}
              </div>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] max-w-4xl">{title}</h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="mx-auto max-w-[780px] px-6 lg:px-8 py-20">
          <Link to="/vlog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-[#C73E1D] mb-10">
            <ArrowLeft className="size-3.5" /> {locale === "ar" ? "كل المقالات" : locale === "zh" ? "所有文章" : "All articles"}
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-xl md:text-2xl leading-relaxed text-foreground mb-12"
          >
            {excerpt}
          </motion.p>
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground/85">
            {body.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-20">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-2xl md:text-3xl">
              {locale === "ar" ? "المزيد من الأخبار" : locale === "zh" ? "更多新闻" : "More from the desk"}
            </h2>
            <Link to="/vlog" className="text-xs uppercase tracking-[0.25em] text-[#C73E1D] inline-flex items-center gap-2">
              {locale === "ar" ? "الكل" : locale === "zh" ? "全部" : "All"} <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((a) => {
              const r = pick(a, locale);
              return (
                <Link key={a.slug} to="/vlog/$slug" params={{ slug: a.slug }} className="group block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={a.image} alt={r.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="mt-4 font-mono text-[11px] text-muted-foreground">{formatDate(a.date, locale)}</div>
                  <div className="mt-1 font-display text-lg group-hover:text-[#C73E1D] transition-colors">{r.title}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}