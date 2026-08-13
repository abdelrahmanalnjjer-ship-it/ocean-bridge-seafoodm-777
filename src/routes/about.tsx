import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  Counter,
  LineReveal,
  ParallaxMedia,
  Reveal,
  ScrollScale,
  Stagger,
  StaggerItem,
} from "@/components/motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ocean Bridge Trade" },
      {
        name: "description",
        content:
          "An asset-light commercial representation firm in Muscat. What we do, what we deliberately do not do, and the standards we hold ourselves to.",
      },
      { property: "og:title", content: "About Ocean Bridge Trade" },
      {
        property: "og:description",
        content: "Corporate discipline between Oman's origin market and international buyers.",
      },
    ],
  }),
  component: AboutPage,
});

const BELIEFS = [
  {
    t: "Relationships over transactions",
    b: "A buyer who returns for the fourth season is worth more than a margin won on the first. We price and behave accordingly.",
  },
  {
    t: "Verifiable or unsaid",
    b: "Every claim traceable to a document or a facility visit. If we cannot show you the evidence, we do not make the claim.",
  },
  {
    t: "Accuracy over speed",
    b: "An offer goes out when origin, grade, volume and compliance are confirmed — not when a competitor has quoted.",
  },
  {
    t: "Corporate standards, informal market",
    b: "KYC, defined response times and structured commercial terms applied to a trade that has run on handshakes for generations.",
  },
  {
    t: "Proximity is the product",
    b: "Ground-level intelligence from Oman's ports, gathered in person, is the thing a buyer cannot get from a database.",
  },
  {
    t: "The cold chain is not negotiable",
    b: "Temperature discipline from landing to container is the difference between a premium grade and a claim.",
  },
];

const NEVER = [
  "Misrepresent our role, our reach, or our capabilities.",
  "Issue an offer built on data we have not verified ourselves.",
  "Overstate a regulatory approval or a facility's status.",
  "Take on a transaction we cannot document end to end.",
];

const STATS = [
  { value: 35, suffix: "", label: "Species catalogued" },
  { value: 4, suffix: "", label: "Regulatory regimes cleared" },
  { value: 48, suffix: "h", label: "Inquiry response" },
  { value: 100, suffix: "%", label: "Pre-shipment review" },
];

function AboutPage() {
  return (
    <div>
      {/* ---- Masthead ---- */}
      <section className="band-deep relative -mt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="/website-images/harbor-boats.jpg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-[50%_35%]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,20,25,0.8),rgba(8,20,25,0.96))]" />
        <div className="shell relative pb-24 pt-36">
          <div className="eyebrow mb-7">About</div>
          <h1 className="h-display h-display-xl max-w-[16ch]">
            <LineReveal immediate lines={["We are the layer", "of accountability."]} />
          </h1>
          <p className="lede lede-lg mt-8 max-w-2xl">
            Between a fragmented origin market and a procurement department that needs
            paperwork, someone has to be answerable. That is the whole job.
          </p>
        </div>
      </section>

      {/* ---- Model ---- */}
      <section className="band-paper">
        <div className="shell section-lg">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="pin self-start">
              <Reveal>
                <div className="eyebrow mb-6">The model</div>
                <h2 className="h-display h-display-lg">Asset-light on purpose.</h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="h-statement text-foreground">
                  Ocean Bridge Trade owns no fleet, no plant and no cold store, and never
                  takes title to the goods.
                  <span className="text-muted-foreground">
                    {" "}
                    That is not a limitation we are apologising for — it is the reason our
                    representation stays objective. We have no inventory to clear and no
                    plant to keep busy, so the only thing we can sell you is an accurate
                    answer.
                  </span>
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-14 grid gap-10 border-t border-border pt-10 sm:grid-cols-2">
                  <div>
                    <div className="label-caps mb-3">What we do not do</div>
                    <ul className="space-y-2 text-[15px] leading-[1.7] text-muted-foreground">
                      <li>Own fishing fleets, processing plants or cold-storage.</li>
                      <li>Take title to goods.</li>
                      <li>Hold speculative inventory.</li>
                    </ul>
                  </div>
                  <div>
                    <div className="label-caps mb-3">What we do</div>
                    <ul className="space-y-2 text-[15px] leading-[1.7] text-muted-foreground">
                      <li>Institutional due diligence on every supplier.</li>
                      <li>Physical facility and cold-chain audits.</li>
                      <li>The full commercial workflow, order to container.</li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Numbers ---- */}
      <section className="band-wash border-y border-border">
        <div className="shell section">
          <Stagger className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <div className="font-display text-5xl leading-none text-foreground md:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="label-caps mt-4">{s.label}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Origin infrastructure ---- */}
      <section className="band-paper">
        <div className="shell section-lg">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="eyebrow mb-6">Origin infrastructure</div>
              <h2 className="h-display h-display-lg">Built in person, audited in person.</h2>
              <p className="lede mt-6">
                From Muscat we run a partner network across Oman's coast — landing sites,
                processors, cold-chain operators and licensed exporters. We walk the
                floors. We check the temperature logs. We know which plant can hold a
                grade in August and which one cannot.
              </p>
              <p className="lede mt-4">
                Continuous market intelligence, physical facility audits and cold-chain
                oversight are the baseline here, not a premium tier.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <ParallaxMedia
                src="/website-images/fishermen.jpg"
                alt="Omani fishermen working at a landing site"
                className="aspect-[4/3]"
                objectPosition="50% 22%"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Beliefs ---- */}
      <section className="band-wash border-t border-border">
        <div className="shell section-lg">
          <Reveal>
            <div className="eyebrow mb-6">Operating principles</div>
            <h2 className="h-display h-display-lg max-w-[20ch]">
              Six things that decide how we behave when it costs us.
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3" step={0.06}>
            {BELIEFS.map((b, i) => (
              <StaggerItem key={b.t}>
                <div className="card-lift flex h-full flex-col border border-border bg-card p-8">
                  <span className="num label-caps text-[color:var(--brand-teal)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-display text-2xl leading-tight text-foreground">{b.t}</h3>
                  <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground">{b.b}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Never ---- */}
      <section className="band-ink">
        <div className="shell section-lg">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <div className="eyebrow mb-6">The discipline</div>
              <h2 className="h-display h-display-lg">What we will never do.</h2>
              <p className="lede mt-6">
                A short list, written down so it can be held against us.
              </p>
            </Reveal>
            <ul>
              {NEVER.map((n, i) => (
                <Reveal key={n} as="li" delay={i * 0.06}>
                  <div className="flex gap-8 border-b border-border py-7">
                    <span className="num label-caps shrink-0 pt-1.5 text-[color:var(--brand-teal)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[19px] leading-[1.5] text-foreground">{n}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- Coast ---- */}
      <section className="band-paper">
        <div className="shell section-lg">
          <Reveal>
            <div className="eyebrow mb-6">Oman's coast</div>
            <h2 className="h-display h-display-lg max-w-[18ch]">
              Two thousand kilometres of Arabian Sea.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <Reveal delay={0.05}>
              <ScrollScale className="aspect-[4/5]">
                <img
                  src="/website-images/harbor-dusk.jpg"
                  alt="Muscat harbour at dusk"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </ScrollScale>
            </Reveal>
            <Reveal delay={0.12}>
              <ScrollScale className="aspect-[4/5]">
                <img
                  src="/website-images/dhow-detail.jpg"
                  alt="Detail of a traditional Omani dhow"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </ScrollScale>
            </Reveal>
            <Reveal delay={0.19}>
              <div className="media aspect-[4/5]">
                <video
                  src="/videos/oman-flag.mp4"
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  aria-hidden
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-6">
              <ScrollScale className="aspect-[21/9]">
                <img
                  src="/website-images/port-cranes.jpg"
                  alt="Export terminal infrastructure"
                  loading="lazy"
                  className="h-full w-full object-cover object-[50%_38%]"
                />
              </ScrollScale>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="band-wash border-t border-border">
        <div className="shell section text-center">
          <Reveal>
            <h2 className="h-display h-display-md mx-auto max-w-[22ch]">
              If that sounds like how you prefer to buy, let's talk.
            </h2>
            <Link to="/contact" className="btn-pill mt-10">
              Start a buyer inquiry
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
