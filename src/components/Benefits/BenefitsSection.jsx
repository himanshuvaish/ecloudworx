// import React from "react";
// import { CheckCircle, Shield, Rocket, Zap, Cog, Users } from "lucide-react";
// import "./BenefitsSection.css"; // ← add this line

// // Swap these with your “benefits-expected” copy
// const DEFAULT_ITEMS = [
//   { icon: Rocket,      title: "Faster Go‑Live",            desc: "Prebuilt templates and opinionated defaults cut setup from weeks to days." },
//   { icon: Shield,      title: "Enterprise‑grade Security", desc: "mTLS inside, OAuth2/JWT at the edge, plus guardrails and policy packs." },
//   { icon: Zap,         title: "Performance & Resilience",  desc: "Bulkheads, circuit breakers, retries with backoff, and autoscale built in." },
//   { icon: Cog,         title: "Observability by Default",  desc: "OpenTelemetry traces, correlation IDs, and dashboards out of the box." },
//   { icon: Users,       title: "Team‑friendly Workflows",   desc: "Preview environments, PR checks, and role‑based access for safe collaboration." },
//   { icon: CheckCircle, title: "Cost‑aware Architecture",   desc: "Pragmatic choices and autoscaling keep infra lean without surprises." },
// ];

// export default function BenefitsSection({
//   eyebrow = "Benefits",
//   heading = "Why teams choose ecloudWorx",
//   subheading = "A crisp value stack your stakeholders can agree on.",
//   items = DEFAULT_ITEMS,
//   className = "",
// }) {
//   return (
//     <section className={`benefits ${className}`}>
//       <div className="benefits__header">
//         {eyebrow && <div className="benefits__eyebrow">{eyebrow}</div>}
//         <h2 className="benefits__title">{heading}</h2>
//         {subheading && <p className="benefits__subtitle">{subheading}</p>}
//       </div>

//       <div className="benefits__grid">
//         {items.map((item, idx) => (
//           <article key={idx} className="benefits__card">
//             <div className="benefits__icon">
//               <item.icon aria-hidden />
//             </div>
//             <div className="benefits__content">
//               <h3 className="benefits__cardTitle">{item.title}</h3>
//               <p className="benefits__desc">{item.desc}</p>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }
import React from "react";
import { CheckCircle, Shield, Rocket, Zap, Cog, Users } from "lucide-react";
import useInView from "../../hooks/useInView";
import "./BenefitsSection.css";

// Default content — swap with your screenshot text anytime
const DEFAULT_ITEMS = [
  { icon: Rocket,      title: "Faster Go‑Live",              desc: "Prebuilt templates and opinionated defaults cut setup from weeks to days." },
  { icon: Shield,      title: "Enterprise‑grade Security",   desc: "mTLS inside, OAuth2/JWT at the edge, plus guardrails and policy packs." },
  { icon: Zap,         title: "Performance & Resilience",    desc: "Bulkheads, circuit breakers, retries with backoff, and autoscale built in." },
  { icon: Cog,         title: "Observability by Default",    desc: "OpenTelemetry traces, correlation IDs, and dashboards out of the box." },
  { icon: Users,       title: "Team‑friendly Workflows",     desc: "Preview environments, PR checks, and role‑based access for safe collaboration." },
  { icon: CheckCircle, title: "Cost‑aware Architecture",     desc: "Pragmatic choices and autoscaling keep infra lean without surprises." },
];

export default function BenefitsSection({
  eyebrow = "Benefits",
  heading = "Why teams choose ecloudWorx",
  subheading = "A crisp value stack your stakeholders can agree on.",
  items = DEFAULT_ITEMS,
  className = "",
  id,
}) {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} id={id} className={`benefits ${className}`}>
      <div className={`benefits__header reveal ${inView ? "is-visible" : ""}`}>
        {eyebrow && <div className="benefits__eyebrow">{eyebrow}</div>}
        <h2 className="benefits__title">{heading}</h2>
        {subheading && <p className="benefits__subtitle">{subheading}</p>}
      </div>

      <div className={`benefits__grid reveal-stagger ${inView ? "is-visible" : ""}`}>
        {items.map((item, idx) => (
          <article key={idx} className="benefits__card lift">
            <div className="benefits__icon">
              <item.icon aria-hidden />
            </div>
            <div className="benefits__content">
              <h3 className="benefits__cardTitle">{item.title}</h3>
              <p className="benefits__desc">{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
