import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

const HARBOR_BOATS_IMAGE = "/website-images/harbor-boats.jpg";
const FISHERMEN_IMAGE = "/website-images/fishermen.jpg";
const PORT_CRANES_IMAGE = "/website-images/port-cranes.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ocean Bridge Trade" },
      { name: "description", content: "Muscat-headquartered commercial representation firm. Asset-light. Structured. Verified." },
      { property: "og:title", content: "About Ocean Bridge Trade" },
      { property: "og:description", content: "Bridging origin markets with global processors through disciplined transaction coordination." },
    ],
  }),
  component: AboutPage,
});

const SECTIONS = [
  { id: "model", label: "Business Model" },
  { id: "governance", label: "Governance" },
  { id: "origin", label: "Origin Infrastructure" },
  { id: "competencies", label: "Competencies" },
  { id: "regulatory", label: "Regulatory Mastery" },
];

const REGS = [
  { region: "China", body: "Full execution of GACC Decree 248 frameworks, CIFER facility registration audits, and accurate Field 519 customs declarations." },
  { region: "Europe", body: "Management of EU TRACES documentation, validated IUU Catch Certificates, and strict alignment with Border Control Post (BCP) protocols." },
  { region: "United States", body: "Adherence to FDA Seafood HACCP standards (21 CFR Part 123) and Foreign Supplier Verification Programs (FSVP)." },
  { region: "GCC", body: "Expedited SFDA FASAH clearance handling and verified Halal certification oversight." },
];

function AboutPage() {
  return (
    <div>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 pt-24 pb-20">
          <div className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground mb-6">About</div>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-end">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
              A corporate bridge between fragmented origin markets and structured international buyers.
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/3] overflow-hidden"
            >
              <img src={HARBOR_BOATS_IMAGE} alt="Muscat harbour" className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision / Mission pull quotes */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-24 grid md:grid-cols-2 gap-16">
          {[
            { label: "Vision", body: "To become a trusted global commercial bridge connecting premium seafood supply markets with qualified international buyers." },
            { label: "Mission", body: "To deliver transparent seafood sourcing, rigorous supplier verification, and professional transaction coordination by bringing corporate discipline to fragmented origin markets." },
          ].map((q) => (
            <motion.div
              key={q.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">{q.label}</div>
              <p className="font-display text-2xl md:text-3xl leading-snug">{q.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-24 grid md:grid-cols-[220px_1fr] gap-16">
        {/* Sidebar */}
        <aside className="hidden md:block sticky top-24 self-start">
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Contents</div>
          <ul className="space-y-3 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-24">
          <section id="model">
            <h2 className="font-display text-3xl md:text-4xl mb-6">The Business Model</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              Ocean Bridge Trade operates as a highly specialized, asset-light commercial representation and transaction coordination firm. Headquartered in Muscat, Sultanate of Oman, we act as the central corporate shield and disciplined intermediary between fragmented origin markets and highly structured international buyers. By deliberately maintaining an asset-light framework, we ensure absolute commercial agility and objective, uncompromised representation.
            </p>
          </section>

          <section id="governance" className="grid md:grid-cols-2 gap-10">
            <div className="border border-border/60 p-8">
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">What we do NOT do</div>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3"><span className="text-muted-foreground">—</span> Own fishing fleets, processing plants, or cold-storage warehouses.</li>
                <li className="flex gap-3"><span className="text-muted-foreground">—</span> Take title to the goods.</li>
                <li className="flex gap-3"><span className="text-muted-foreground">—</span> Hold speculative physical inventory.</li>
              </ul>
            </div>
            <div className="border border-foreground/40 p-8 bg-card/40">
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">What we DO</div>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3"><span>+</span> Institutional due diligence & supplier verification.</li>
                <li className="flex gap-3"><span>+</span> Verify structural supply capabilities.</li>
                <li className="flex gap-3"><span>+</span> Enforce strict cold-chain compliance protocols.</li>
                <li className="flex gap-3"><span>+</span> Orchestrate the complete end-to-end commercial workflow.</li>
              </ul>
            </div>
          </section>

          <section id="origin">
            <h2 className="font-display text-3xl md:text-4xl mb-6">Origin Infrastructure</h2>
            <div className="grid md:grid-cols-[1fr_1fr] gap-10 items-center">
              <p className="text-muted-foreground leading-relaxed">
                Operating directly from our Muscat headquarters, our core operational advantage is anchored by a deep-rooted, Oman-based commercial partner network. This localized infrastructure provides continuous on-the-ground market intelligence, executes rigorous physical facility audits, and maintains absolute oversight of cold-chain integrity prior to export.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="aspect-[4/3] overflow-hidden"
              >
                <img src={FISHERMEN_IMAGE} alt="Omani fishermen at work" className="h-full w-full object-cover" />
              </motion.div>
            </div>
          </section>

          <section id="competencies" className="space-y-6">
            <h2 className="font-display text-3xl md:text-4xl mb-6">Core Competencies</h2>
            {[
              { n: "01", title: "Structured Sourcing", body: "Leveraging our vetted Oman partner network to match precise international buyer specifications with seasonal catch availability and processing capabilities." },
              { n: "02", title: "Supplier Verification", body: "Strict multi-layered verification combining remote document audits (Corporate KYC, HACCP, GACC CIFER validity) with physical inspections of facilities, processing lines, and cold-chain infrastructure." },
              { n: "03", title: "Transaction Coordination", body: "Orchestrating the entire transactional lifecycle — from blind introductions and risk-mitigated negotiation structuring to rigid export documentation oversight and freight alignment." },
            ].map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-t border-border/60 pt-6 grid md:grid-cols-[60px_1fr] gap-4"
              >
                <div className="font-mono text-xs text-muted-foreground">{c.n}</div>
                <div>
                  <div className="font-display text-2xl mb-2">{c.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{c.body}</p>
                </div>
              </motion.div>
            ))}
          </section>

          <section id="regulatory">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[21/9] overflow-hidden mb-10"
            >
              <img src={PORT_CRANES_IMAGE} alt="Port export infrastructure" className="h-full w-full object-cover" />
            </motion.div>
            <h2 className="font-display text-3xl md:text-4xl mb-8">Regulatory Mastery</h2>
            <div className="grid md:grid-cols-2 gap-px bg-border/60">
              {REGS.map((r, i) => (
                <motion.div
                  key={r.region}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-background p-8"
                >
                  <div className="font-mono text-xs text-brand-marine mb-4">{r.region}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}