// import React from "react";
// import "./Pricing.css";

// const PLANS = [
//   {
//     name: "Free",
//     price: "$ 0",
//     cadence: "forever",
//     features: [
//       "1 cloud provider",
//       "Basic dashboard",
//       "5 automations",
//       "Community support",
//     ],
//     cta: { label: "Get Started", href: "#get-started" },
//     highlight: false,
//   },
//   {
//     name: "Pro",
//     badge: "Most Popular",
//     price: "$ 49",
//     cadence: "per month",
//     features: [
//       "All cloud providers",
//       "Advanced dashboard",
//       "Unlimited automations",
//       "Priority support",
//       "Custom templates",
//     ],
//     cta: { label: "Start Free Trial", href: "#start-trial" },
//     highlight: true,
//   },
//   {
//     name: "Enterprise",
//     price: "Custom",
//     cadence: "contact us",
//     features: [
//       "Everything in Pro",
//       "Custom automation development",
//       "Dedicated support",
//       "SLA guarantee",
//       "On-premise deployment",
//     ],
//     cta: { label: "Contact Sales", href: "#contact-sales" },
//     highlight: false,
//   },
// ];

// export default function Pricing() {
//   return (
//     <section className="pricing" id="pricing">
//       <div className="pricing__header">
//         <h2 className="pricing__title">Simple, Transparent Pricing</h2>
//         <p className="pricing__subtitle">
//           Choose the plan that fits your team size and needs
//         </p>
//       </div>

//       <div className="pricing__grid">
//         {PLANS.map((plan) => (
//           <article
//             key={plan.name}
//             className={`pricing__card ${plan.highlight ? "is-highlight" : ""}`}
//             aria-label={`${plan.name} plan`}
//           >
//             {plan.badge && <div className="pricing__badge">{plan.badge}</div>}

//             <header className="pricing__cardHead">
//               <h3 className="pricing__planName">{plan.name}</h3>
//               <div className="pricing__priceRow">
//                 <div className="pricing__price">{plan.price}</div>
//                 <div className="pricing__cadence">{plan.cadence}</div>
//               </div>
//             </header>

//             <ul className="pricing__features">
//               {plan.features.map((f, i) => (
//                 <li key={i} className="pricing__feature">
//                   {f}
//                 </li>
//               ))}
//             </ul>

//             <a className="pricing__cta" href={plan.cta.href}>
//               {plan.cta.label}
//             </a>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

import React from "react";
import useInView from "../../hooks/useInView";
import "./Pricing.css";

const PLANS = [
  {
    name: "Free",
    price: "$ 0",
    cadence: "forever",
    features: [
      "1 cloud provider",
      "Basic dashboard",
      "5 automations",
      "Community support",
    ],
    cta: { label: "Get Started", href: "#contact" },
    highlight: false,
  },
  {
    name: "Pro",
    badge: "Most Popular",
    price: "$ 49",
    cadence: "per month",
    features: [
      "All cloud providers",
      "Advanced dashboard",
      "Unlimited automations",
      "Priority support",
      "Custom templates",
    ],
    cta: { label: "Start Free Trial", href: "#signup" },
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "contact us",
    features: [
      "Everything in Pro",
      "Custom automation development",
      "Dedicated support",
      "SLA guarantee",
      "On-premise deployment",
    ],
    cta: { label: "Contact Sales", href: "#contact" },
    highlight: false,
  },
];

export default function Pricing() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="pricing" id="pricing">
      <div className={`pricing__header reveal ${inView ? "is-visible" : ""}`}>
        <h2 className="pricing__title">Simple, Transparent Pricing</h2>
        <p className="pricing__subtitle">
          Choose the plan that fits your team size and needs
        </p>
      </div>

      <div className={`pricing__grid reveal-stagger ${inView ? "is-visible" : ""}`}>
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`pricing__card ${plan.highlight ? "is-highlight" : ""} lift`}
            aria-label={`${plan.name} plan`}
          >
            {plan.badge && <div className="pricing__badge">{plan.badge}</div>}

            <header className="pricing__cardHead">
              <h3 className="pricing__planName">{plan.name}</h3>
              <div className="pricing__priceRow">
                <div className="pricing__price">{plan.price}</div>
                <div className="pricing__cadence">{plan.cadence}</div>
              </div>
            </header>

            <ul className="pricing__features">
              {plan.features.map((f, i) => (
                <li key={i} className="pricing__feature">{f}</li>
              ))}
            </ul>

            <a className="pricing__cta" href={plan.cta.href}>
              {plan.cta.label}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
