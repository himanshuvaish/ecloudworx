// import React from "react";
// import "./SocialProof.css";

// /**
//  * KPI/Social Proof strip
//  * - Edit the DEFAULT_METRICS values to your own numbers/text.
//  * - Or pass a custom `metrics` prop: [{ value: "12k+", label: "..." }, ...]
//  */
// const DEFAULT_METRICS = [
//   { value: "10,000+", label: "Resources managed" },
//   { value: "40%",    label: "Average cost savings" },
//   { value: "500+",   label: "New customers onboarded" },
// ];

// export default function SocialProof({ metrics = DEFAULT_METRICS, className = "" }) {
//   return (
//     <section className={`socialproof ${className}`}>
//       <div className="socialproof__inner">
//         <div className="socialproof__grid">
//           {metrics.map((m, i) => (
//             <div key={i} className="socialproof__item" aria-label={m.label}>
//               <div className="socialproof__value">{m.value}</div>
//               <div className="socialproof__label">{m.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import useInView from "../../hooks/useInView";
import "./SocialProof.css";

const DEFAULT_METRICS = [
  { value: "10,000+", label: "Resources managed" },
  { value: "40%",     label: "Average cost savings" },
  { value: "500+",    label: "Happy Customers" },
];

export default function SocialProof({ metrics = DEFAULT_METRICS, className = "", id }) {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} id={id} className={`socialproof ${className}`}>
      <div className="socialproof__inner">
        <div className={`socialproof__grid reveal-stagger ${inView ? "is-visible" : ""}`}>
          {metrics.map((m, i) => (
            <div key={i} className="socialproof__item lift" aria-label={m.label}>
              <div className="socialproof__value">{m.value}</div>
              <div className="socialproof__label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

