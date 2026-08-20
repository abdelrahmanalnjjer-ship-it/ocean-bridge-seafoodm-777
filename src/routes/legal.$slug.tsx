import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { LEGAL_DOCS, LEGAL_UPDATED, legalBySlug } from "@/data/legal";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/legal/$slug")({
  loader: ({ params }) => {
    const doc = legalBySlug(params.slug);
    if (!doc) throw notFound();
    return doc;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Ocean Bridge Trade` },
          { name: "description", content: loaderData.standfirst },
          { property: "og:title", content: `${loaderData.title} — Ocean Bridge Trade` },
          { property: "og:description", content: loaderData.standfirst },
        ]
      : [],
  }),
  component: LegalPage,
});

function LegalPage() {
  const doc = Route.useLoaderData();

  return (
    <div>
      {/* ---- Masthead ---- */}
      <section className="band-deep relative overflow-hidden">
        <div className="scrim-masthead absolute inset-0" />
        <div className="shell relative pb-16 pt-32">
          <div className="eyebrow mb-7">Legal and policy</div>
          <h1 className="h-display h-display-lg max-w-[18ch]">{doc.title}</h1>
          <p className="lede lede-lg mt-7 max-w-2xl">{doc.standfirst}</p>
          <p className="label-caps mt-8">Last updated {LEGAL_UPDATED}</p>
        </div>
      </section>

      {/* ---- Body + index ---- */}
      <section className="band-paper">
        <div className="shell section-lg grid gap-14 lg:grid-cols-[1fr_260px] lg:gap-20">
          {/* Measure held near 70ch — long-form legal text is the one place on
           * this site where a reader actually reads every line. */}
          <Reveal>
            <article className="max-w-[68ch]">
              {doc.blocks.map((block, i) => {
                if (block.kind === "h") {
                  return (
                    <h2
                      key={i}
                      className="h-display h-display-sm mt-12 border-t border-border pt-8 first:mt-0 first:border-0 first:pt-0"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.kind === "p") {
                  return (
                    <p key={i} className="mt-5 text-[16px] leading-[1.75] text-muted-foreground">
                      {block.text}
                    </p>
                  );
                }
                if (block.kind === "ul") {
                  return (
                    <ul key={i} className="mt-5 space-y-3">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="relative ps-6 text-[16px] leading-[1.75] text-muted-foreground before:absolute before:start-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-[color:var(--accent)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <dl key={i} className="mt-6 space-y-6">
                    {block.items.map(([term, def]) => (
                      <div key={term} className="border-s-2 border-border ps-5">
                        <dt className="font-display text-xl leading-tight text-foreground">
                          {term}
                        </dt>
                        <dd className="mt-2 text-[16px] leading-[1.75] text-muted-foreground">
                          {def}
                        </dd>
                      </div>
                    ))}
                  </dl>
                );
              })}
            </article>
          </Reveal>

          {/* ---- Sibling documents ---- */}
          <aside className="lg:pin lg:self-start">
            <div className="eyebrow-muted mb-5">Also here</div>
            <ul className="space-y-3">
              {LEGAL_DOCS.map((d) => (
                <li key={d.slug}>
                  <Link
                    to="/legal/$slug"
                    params={{ slug: d.slug }}
                    className={`text-[15px] transition-colors ${
                      d.slug === doc.slug
                        ? "text-[color:var(--accent)]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-border pt-7">
              <div className="label-caps mb-3">Questions</div>
              <a
                href="mailto:info@oceanbridge-trade.com"
                className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
              >
                info@oceanbridge-trade.com
              </a>
              <Link to="/contact" className="link-underline mt-7">
                Trade desk <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
