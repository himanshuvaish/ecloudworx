// src/components/NavItem.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * NavItem - renders an external <a> for http(s) links
 * or internal Link / anchor for internal routes/anchors.
 *
 * Props:
 *  - name: string
 *  - href: string
 *  - className?: string
 */
export default function NavItem({ name, href, className = "" }) {
  if (!href || typeof href !== "string") {
    return <span className={className}>{name}</span>;
  }

  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  // anchor fragment (e.g. #features) -> use normal <a>
  if (!isExternal && href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {name}
      </a>
    );
  }

  if (isExternal) {
    // Use <a> so browser will navigate away (open in new tab to be safe)
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {name}
      </a>
    );
  }

  // Otherwise it's an internal route path — use react-router Link
  return (
    <Link to={href} className={className}>
      {name}
    </Link>
  );
}
