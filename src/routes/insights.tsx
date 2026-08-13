import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "@/data/insights";
import { LineReveal, Reveal, ScrollScale, Stagger, StaggerItem } from "@/components/motion";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Ocean Bridge Trade" },
      {
        name: "description",
        content:
          "Field notes on Oman-origin seafood: GACC registration, EU catch certification, cold-chain practice, season windows and Incoterms.",
      },
      { property: "og:title", content: "Insights — Ocean Bridge Trade" },
      {
        property: "og:description",
        content: "Compliance and sourcing notes for processors and importers.",
      },
    ],
  }),
  component: InsightsIndex,
});

function InsightsIndex() {
  const [lead, ...rest] = ARTICLES;

  return (
    <div>
      <section className="band-deep relative -mt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/website-images/harbor-dusk.jpg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-[50%_45%]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,20,25,0.84),rgba(8,20,25,0.97))]" />
        <div className="shell relative pb-24 pt-40">
          <div className="eyebrow mb-7">Insights</div>
          <h1 className="h-display h-display-xl max-w-[14ch]">
            <LineReveal immediate lines={["Notes from", "the trade desk."]} />
          </h1>
          <p className="lede lede-lg mt-8 max-w-2xl">
            What we learn clearing consignments out of Oman — registration, catch
            documentation, cold chain and commercial terms. Written for the people who
            have to make the shipment work.
          </p>
        </div>
      </section>

      {/* Lead article */}
      <section className="band-paper">
        <div className="shell section-lg">
          <Reveal>
            <Link to="/article/$slug" params={{ slug: lead.slug }} className="group block">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <ScrollScale className="aspect-[4/3]">
                  <img
                    src={lead.image}
                    alt={lead.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </ScrollScale>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="label-caps text-[color:var(--brand-teal)]">{lead.topic}</span>
                    <span className="label-caps">{lead.dateLabel}</span>
                    <span className="label-caps">{lead.readingMinutes} min</span>
                  </div>
                  <h2 className="h-display h-display-md mt-5">{lead.title}</h2>
                  <p className="lede mt-5">{lead.standfirst}</p>
                  <span className="link-underline mt-8">
                    Read the article
                    <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The rest */}
      <section className="band-wash border-t border-border">
        <div className="shell section-lg">
          <Stagger className="grid gap-8 md:grid-cols-2 xl:grid-cols-4" step={0.07}>
            {rest.map((a) => (
              <StaggerItem key={a.slug}>
                <ArticleCard article={a} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="band-paper border-t border-border">
        <div className="shell section text-center">
          <Reveal>
            <h2 className="h-display h-display-md mx-auto max-w-[24ch]">
              Have a question these don't answer?
            </h2>
            <Link to="/contact" className="btn-pill mt-10">
              Ask the trade desk
              <span className="pill-badge">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export function ArticleCard({ article }: { article: (typeof ARTICLES)[number] }) {
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="card-lift group flex h-full flex-col border border-border bg-card"
    >
      <div className="media aspect-[16/10] overflow-hidden">
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          className="transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="label-caps text-[color:var(--brand-teal)]">{article.topic}</span>
          <span className="label-caps">{article.readingMinutes} min</span>
        </div>
        <h3 className="mt-3 font-display text-2xl leading-tight text-foreground">
          {article.title}
        </h3>
        <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">
          {article.standfirst}
        </p>
        <span className="label-caps mt-auto pt-6">{article.dateLabel}</span>
      </div>
    </Link>
  );
}
