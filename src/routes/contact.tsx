import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import harborDusk from "@/assets/harbor-dusk.jpg.asset.json";
import dhowDetail from "@/assets/dhow-detail.jpg.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Connect — Ocean Bridge Trade" },
      { name: "description", content: "Initiate a sourcing inquiry. Muscat, Oman headquarters. Global trade desk." },
      { property: "og:title", content: "Connect — Ocean Bridge Trade" },
      { property: "og:description", content: "Global trade desk. Initiate a sourcing inquiry." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 pt-24 pb-16">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-end">
            <div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground mb-6">Connect</div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
                The Global Trade Desk.
              </h1>
              <p className="mt-8 max-w-xl text-muted-foreground">
                All inquiries are treated as confidential. A member of our commercial team will respond within one business day.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/3] overflow-hidden"
            >
              <img src={harborDusk.url} alt="Muscat harbour at dusk" className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-20 grid md:grid-cols-[1fr_1.2fr] gap-16">
          {/* Left */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-[4/3] overflow-hidden"
            >
              <img src={dhowDetail.url} alt="Traditional dhow detail" className="h-full w-full object-cover" />
            </motion.div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Headquarters</div>
              <div className="flex items-start gap-3">
                <MapPin className="size-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-display text-xl">Muscat</div>
                  <div className="text-sm text-muted-foreground">Sultanate of Oman</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Communications</div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3"><Phone className="size-4 text-muted-foreground" /><span className="font-mono">+968 77 62 1857</span><span className="text-[10px] uppercase tracking-widest text-muted-foreground">Oman</span></li>
                <li className="flex items-center gap-3"><Phone className="size-4 text-muted-foreground" /><span className="font-mono">+20 106 897 1773</span><span className="text-[10px] uppercase tracking-widest text-muted-foreground">Egypt</span></li>
                <li className="flex items-center gap-3"><Phone className="size-4 text-muted-foreground" /><span className="font-mono">+971 50 485 0309</span><span className="text-[10px] uppercase tracking-widest text-muted-foreground">WhatsApp</span></li>
                <li className="flex items-center gap-3"><Mail className="size-4 text-muted-foreground" /><a href="mailto:info@oceanbridge-trade.com" className="hover:text-foreground">info@oceanbridge-trade.com</a></li>
                <li className="flex items-center gap-3"><Linkedin className="size-4 text-muted-foreground" /><a href="https://www.linkedin.com/company/oceanbridge-trade" target="_blank" rel="noreferrer" className="hover:text-foreground">/company/oceanbridge-trade</a></li>
              </ul>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Portal</div>
              <a href="https://www.oceanbridge-trade.com" className="font-mono text-sm hover:text-foreground">www.oceanbridge-trade.com</a>
            </div>
          </div>

          {/* Form */}
          <div className="border border-border/60 bg-card/40 p-8 md:p-12">
            {sent ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="font-display text-3xl mb-4">Inquiry received.</div>
                <p className="text-muted-foreground max-w-sm">Thank you. A member of our commercial desk will respond within one business day.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Full Name" name="name" required />
                  <Field label="Company" name="company" required />
                  <Field label="Country" name="country" required />
                  <Field label="Estimated Volume (MT)" name="volume" />
                </div>
                <Field label="Species of Interest" name="species" placeholder="e.g. Yellowfin Tuna, Cuttlefish, Grouper" />
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Message</label>
                  <textarea rows={5} required className="mt-2 w-full bg-transparent border-b border-border/60 focus:border-foreground/80 outline-none py-2 text-sm resize-none" />
                </div>
                <button type="submit" className="group inline-flex items-center gap-3 border border-foreground/60 hover:bg-foreground hover:text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors">
                  Initiate Inquiry <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, required, placeholder }: { label: string; name: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      <input
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent border-b border-border/60 focus:border-foreground/80 outline-none py-2 text-sm"
      />
    </div>
  );
}