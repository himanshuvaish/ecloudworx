// import React from "react";
// import "./Footer.css";

// export default function Footer() {
//   return (
//     <footer className="siteFooter">
//       <div className="siteFooter__inner">
//         <div className="siteFooter__top">
//           <div className="siteFooter__brand">
//             <div className="siteFooter__logo">☁️ eCloudWorx</div>
//             <p className="siteFooter__tagline">Your cloud, simplified.</p>
//           </div>

//           <nav className="siteFooter__nav">
//             <div className="siteFooter__col">
//               <h4 className="siteFooter__heading">Product</h4>
//               <ul>
//                 <li><a href="#features">Features</a></li>
//                 <li><a href="#library">Automation Library</a></li>
//                 <li><a href="#pricing">Pricing</a></li>
//                 <li><a href="#api">API Docs</a></li>
//               </ul>
//             </div>

//             <div className="siteFooter__col">
//               <h4 className="siteFooter__heading">Company</h4>
//               <ul>
//                 <li><a href="#about">About Us</a></li>
//                 <li><a href="#blog">Blog</a></li>
//                 <li><a href="#careers">Careers</a></li>
//                 <li><a href="#contact">Contact</a></li>
//               </ul>
//             </div>

//             <div className="siteFooter__col">
//               <h4 className="siteFooter__heading">Support</h4>
//               <ul>
//                 <li><a href="#help">Help Center</a></li>
//                 <li><a href="#community">Community</a></li>
//                 <li><a href="#status">Status</a></li>
//                 <li><a href="#security">Security</a></li>
//               </ul>
//             </div>
//           </nav>
//         </div>

//         <div className="siteFooter__bottom">
//           <span>© 2025 eCloudWorx. All rights reserved.</span>
//         </div>
//       </div>
//     </footer>
//   );
// }
import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="siteFooter__inner">
        <div className="siteFooter__top">
          <div className="siteFooter__brand">
            <div className="siteFooter__logo">☁️ eCloudWorx</div>
            {/* anchor target for CTAs */}
            <p id="contact" className="siteFooter__tagline">
              Your cloud, simplified. Reach us at{" "}
              <a href="mailto:hi@ecloudworx.com">hi@ecloudworx.com</a>
            </p>
            {/* optional signup anchor */}
            <div id="signup" style={{ height: 0, overflow: "hidden" }} />
          </div>

          <nav className="siteFooter__nav">
            <div className="siteFooter__col">
              <h4 className="siteFooter__heading">Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#library">Automation Library</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#api">API Docs</a></li>
              </ul>
            </div>

            <div className="siteFooter__col">
              <h4 className="siteFooter__heading">Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="siteFooter__col">
              <h4 className="siteFooter__heading">Support</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#status">Status</a></li>
                <li><a href="#security">Security</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="siteFooter__bottom">
          <span>© 2025 eCloudWorx. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
