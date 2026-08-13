import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ARTICLES, getArticle } from "@/data/insights";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/article/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Ocean Bridge Trade` },
          { name: "description", content: loaderData.standfirst },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.standfirst },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const article = Route.useLoaderData();
  const more = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div>
      {/* Masthead */}
      <section className="band-deep relative -mt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src={article.image} alt="" aria-hidden className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,20,25,0.86),rgba(8,20,25,0.97))]" />
        <div className="shell relative pb-20 pt-40">
          <Link to="/insights" className="link-underline mb-10">
            <ArrowLeft className="size-4" />
            All insights
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <span className="label-caps text-[color:var(--brand-teal)]">{article.topic}</span>
            <span className="label-caps">{article.dateLabel}</span>
            <span className="label-caps">{article.readingMinutes} min read</span>
          </div>
          <h1 className="h-display h-display-lg mt-6 max-w-[22ch]">{article.title}</h1>
          <p className="lede lede-lg mt-7 max-w-2xl">{article.standfirst}</p>
        </div>
      </section>

      {/* Body. Measure is constrained to ~68ch — the single biggest factor in
        * whether long-form actually gets read. */}
      <article className="band-paper">
        <div className="shell section-lg">
          <div className="mx-auto max-w-[68ch]">
            {article.body.map((para) =>
              para.startsWith("## ") ? (
                <h2 key={para} className="h-display h-display-sm mt-14 mb-5 first:mt-0">
                  {para.replace("## ", "")}
                </h2>
              ) : (
                <p key={para} className="mb-6 text-[18px] leading-[1.75] text-muted-foreground">
                  {para}
                </p>
              ),
            )}

            <div className="mt-16 border-t border-border pt-10">
              <p className="text-[15px] leading-[1.7] text-fg-subtle">
                Written by the Ocean Bridge Trade desk, Muscat. Regulatory detail changes
                — if you are planning a shipment against anything described here, confirm
                the current position with us or your customs broker before you commit.
              </p>
              <Link to="/contact" className="btn-pill mt-8">
                Ask the trade desk
                <span className="pill-badge">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* More */}
      <section className="band-wash border-t border-border">
        <div className="shell section">
          <Reveal>
            <div className="eyebrow mb-8">Keep reading</div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {more.map((a) => (
              <Reveal key={a.slug} as="article">
                <Link
                  to="/article/$slug"
                  params={{ slug: a.slug }}
                  className="card-lift group flex h-full flex-col border border-border bg-card"
                >
                  <div className="media aspect-[16/10] overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.imageAlt}
                      loading="lazy"
                      className="transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="label-caps text-[color:var(--brand-teal)]">{a.topic}</span>
                    <h3 className="mt-3 font-display text-xl leading-tight text-foreground">
                      {a.title}
                    </h3>
                    <span className="label-caps mt-auto pt-6">{a.readingMinutes} min</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
