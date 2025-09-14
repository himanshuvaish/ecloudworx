// src/data/navigation.js
// University URL resolution:
// 1) At runtime in the Docker/nginx image we prefer window.__ENV__.UNIVERSITY_URL
// 2) For dev/build (vite) use VITE_UNIVERSITY_URL
// 3) Fallback to the local anchor '#university'

const getUniversityUrl = () => {
  try {
    if (typeof window !== "undefined" && window.__ENV && window.__ENV.UNIVERSITY_URL) {
      return window.__ENV.UNIVERSITY_URL;
    }
  } catch (e) {
    // ignore
  }
  return import.meta.env.VITE_UNIVERSITY_URL || "#university";
};

const universityHref = getUniversityUrl();

export const navigation = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Resources", href: "#resources" },
  { name: "ecloudWorx University", href: universityHref },
  { name: "Login", href: "#" }
];
