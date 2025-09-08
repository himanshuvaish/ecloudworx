// import React, { useEffect, useState } from "react";

// /**
//  * eCloudWorx University - Enhanced Landing Page
//  * - Uses Vite env: import.meta.env.VITE_STRAPI_URL || fallback
//  * - No react-router-dom dependency (uses plain anchors)
//  * - Left: Categories (click to filter)
//  * - Center: Articles (search + grid)
//  * - Right: Featured articles
//  */

// const STRAPI = import.meta.env.VITE_STRAPI_URL || "http://localhost:7200";
// const LOGO_PATH = "/university.png";

// function formatDate(iso) {
//   if (!iso) return "";
//   try {
//     return new Date(iso).toLocaleDateString();
//   } catch (e) {
//     return iso;
//   }
// }

// export default function UniversityLanding() {
//   const [categories, setCategories] = useState([]);
//   const [articles, setArticles] = useState([]); // raw articles from API
//   const [filteredArticles, setFilteredArticles] = useState([]); // shown in center
//   const [featured, setFeatured] = useState([]);
//   const [query, setQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch categories
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const res = await fetch(`${STRAPI}/api/categories`);
//         if (!res.ok) throw new Error(`Categories fetch failed: ${res.status}`);
//         const json = await res.json();
//         // json.data expected as array; keep id + attributes if wrapped or flat shape
//         const list =
//           (json.data || json).map
//             ? (json.data || json).map((c) => {
//                 // support both shapes: { id, attributes: { Name } } and flat { id, Name }
//                 if (c.attributes) {
//                   return { id: c.id, name: c.attributes.Name || c.attributes.name };
//                 } else {
//                   return { id: c.id, name: c.Name || c.name || "Category" };
//                 }
//               })
//             : [];
//         setCategories(list);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchCategories();
//   }, []);

//   // Fetch articles (main)
//   useEffect(() => {
//     fetchAllArticles();
//   }, []);

//   async function fetchAllArticles() {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${STRAPI}/api/articles?pagination[page]=1&pagination[pageSize]=50`);
//       if (!res.ok) throw new Error(`Articles fetch failed: ${res.status}`);
//       const json = await res.json();
//       // Strapi schema may return array at json.data OR flat array; handle both
//       const raw = json.data || json || [];
//       // Map to consistent shape
//       const mapped = raw.map((it) => {
//         // if Strapi v4 default: item may be flat or have attributes
//         const item = it.attributes ? { id: it.id, ...it.attributes } : it;
//         return {
//           id: item.id ?? it.id,
//           Title: item.Title ?? item.title ?? "",
//           Slug: item.Slug ?? item.slug ?? item.Slug ?? "",
//           Summary: item.Summary ?? item.summary ?? (item.Content ? String(item.Content).slice(0, 200) : ""),
//           Content: item.Content ?? item.content ?? "",
//           Technology: item.Technology ?? item.technology ?? "",
//           PublishedDate: item.PublishedDate ?? item.publishedAt ?? item.publishedAt ?? item.PublishedDate ?? "",
//           Published: item.Published ?? (item.published ?? true),
//         };
//       });

//       // set articles and filtered articles
//       setArticles(mapped);
//       setFilteredArticles(mapped);

//       // featured: top 4 published by date desc
//       const featuredList = mapped
//         .filter((a) => a.Published !== false) // ensure published
//         .sort((a, b) => new Date(b.PublishedDate) - new Date(a.PublishedDate))
//         .slice(0, 4);
//       setFeatured(featuredList);
//     } catch (err) {
//       console.error(err);
//       setError(String(err));
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Filter when query or activeCategory changes
//   useEffect(() => {
//     let res = [...articles];
//     if (activeCategory) {
//       // category filtering: match by Technology or category name (depends on schema)
//       res = res.filter((a) => {
//         const tech = (a.Technology || "").toString().toLowerCase();
//         const cat = (activeCategory.name || "").toString().toLowerCase();
//         return tech.includes(cat) || a.Categories?.some?.((c) => (c.name || "").toLowerCase() === cat) || cat === "";
//       });
//     }
//     if (query && query.trim().length > 0) {
//       const q = query.trim().toLowerCase();
//       res = res.filter(
//         (a) =>
//           (a.Title || "").toLowerCase().includes(q) ||
//           (a.Summary || "").toLowerCase().includes(q) ||
//           (a.Content || "").toLowerCase().includes(q)
//       );
//     }
//     setFilteredArticles(res);
//   }, [articles, query, activeCategory]);

//   function handleCategoryClick(cat) {
//     if (!cat) {
//       setActiveCategory(null);
//     } else {
//       setActiveCategory(cat);
//     }
//   }

//   function clearFilters() {
//     setActiveCategory(null);
//     setQuery("");
//     setFilteredArticles(articles);
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto px-6 py-5">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <img src={LOGO_PATH} alt="ecloudWorx University" className="h-12 w-12 object-contain rounded-xl shadow-sm" />
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full border-2 border-white"></div>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold tracking-tight text-gray-900">
//                   eCloudWorx <span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">University</span>
//                 </h1>
//                 <p className="text-sm text-gray-500 font-medium">Concepts explained by industry veterans — practical & curated</p>
//               </div>
//             </div>

//             <nav className="hidden md:flex gap-8 items-center">
//               <a href="#featured" className="text-gray-700 hover:text-indigo-600 font-medium text-sm transition-colors relative group">
//                 Featured
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
//               </a>
//               <a href="#articles" className="text-gray-700 hover:text-indigo-600 font-medium text-sm transition-colors relative group">
//                 All Articles
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
//               </a>
//               <a href="#about" className="text-gray-700 hover:text-indigo-600 font-medium text-sm transition-colors relative group">
//                 About
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
//               </a>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative py-16 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/30"></div>
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
//         <div className="relative max-w-4xl mx-auto text-center px-6">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
//             Master Technology with 
//             <span className="text-indigo-600 block">Expert Knowledge</span>
//           </h2>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
//             Dive into curated content crafted by industry professionals. From cloud computing to modern development practices.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <a href="#articles" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
//               Explore Articles
//             </a>
//             <a href="#featured" className="px-8 py-4 border-2 border-indigo-200 text-indigo-700 rounded-full font-semibold hover:bg-indigo-50 transition-all duration-300">
//               View Featured
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Main layout: left (categories) / center (articles) / right (featured) */}
//       <main className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
//         {/* Left: Categories */}
//         <aside className="lg:col-span-2">
//           <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 sticky top-28">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-lg font-bold text-gray-900">Categories</h2>
//                 <button
//                   onClick={clearFilters}
//                   className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors"
//                   aria-label="Clear filters"
//                 >
//                   Clear
//                 </button>
//               </div>

//               <div className="space-y-2">
//                 <button
//                   onClick={() => handleCategoryClick(null)}
//                   className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
//                     !activeCategory 
//                       ? "bg-indigo-100 text-indigo-700 shadow-sm" 
//                       : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
//                   }`}
//                 >
//                   All Categories
//                 </button>

//                 {categories.length === 0 && (
//                   <div className="text-sm text-gray-500 px-4 py-3 text-center">No categories available</div>
//                 )}

//                 {categories.map((cat) => (
//                   <button
//                     key={cat.id}
//                     onClick={() => handleCategoryClick(cat)}
//                     className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
//                       activeCategory?.id === cat.id 
//                         ? "bg-indigo-100 text-indigo-700 shadow-sm" 
//                         : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
//                     }`}
//                   >
//                     {cat.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Center: Articles */}
//         <section id="articles" className="lg:col-span-7">
//           {/* Search */}
//           <div className="mb-8">
//             <div className="relative">
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search articles, technologies, or topics..."
//                 className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200/50 bg-white/70 backdrop-blur-sm focus:outline-none focus:border-indigo-300 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
//               />
//               <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>

//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">
//               {activeCategory ? `${activeCategory.name} Articles` : "All Articles"}
//               <span className="text-lg font-normal text-gray-500 ml-2">
//                 ({filteredArticles.length})
//               </span>
//             </h2>
//           </div>

//           {loading && (
//             <div className="flex items-center justify-center py-16">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//               <span className="ml-3 text-gray-600">Loading articles...</span>
//             </div>
//           )}
          
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700">
//               <strong>Error:</strong> {String(error)}
//             </div>
//           )}

//           {filteredArticles.length === 0 && !loading && (
//             <div className="bg-white/70 backdrop-blur-sm border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
//               <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               <p className="text-gray-500 text-lg font-medium">No articles found</p>
//               <p className="text-gray-400 text-sm mt-1">Try adjusting your search or category filter</p>
//             </div>
//           )}

//           <div className="grid grid-cols-1 gap-6">
//             {filteredArticles.map((a) => (
//               <article key={a.id} className="group bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:bg-white transition-all duration-300">
//                 <div className="flex items-start gap-6">
//                   <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
//                     {a.Title ? a.Title.split(" ").slice(0,2).map(word => word[0]).join("") : "KB"}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between mb-3">
//                       <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
//                         {a.Title || "Untitled Article"}
//                       </h3>
//                     </div>
//                     <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
//                       {a.Summary || (a.Content ? String(a.Content).slice(0,180) + "..." : "No summary available")}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4 text-sm text-gray-500">
//                         {a.Technology && (
//                           <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
//                             {a.Technology}
//                           </span>
//                         )}
//                         {a.PublishedDate && (
//                           <span className="flex items-center gap-1">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                             </svg>
//                             {formatDate(a.PublishedDate)}
//                           </span>
//                         )}
//                       </div>
//                       <a 
//                         href={`/article/${encodeURIComponent(a.Slug) || a.id}`} 
//                         className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
//                       >
//                         Read Article
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                         </svg>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </section>

//         {/* Right: Featured */}
//         <aside id="featured" className="lg:col-span-3">
//           <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/60 backdrop-blur-sm border border-indigo-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 sticky top-28">
//             <div className="flex items-center gap-2 mb-5">
//               <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
//               <h3 className="text-lg font-bold text-gray-900">Featured Articles</h3>
//             </div>
            
//             {featured.length === 0 && (
//               <div className="text-center py-8">
//                 <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                 </svg>
//                 <p className="text-sm text-gray-500">No featured content yet</p>
//               </div>
//             )}
            
//             <div className="space-y-4">
//               {featured.map((f, idx) => (
//                 <article key={f.id} className={`group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border ${idx === 0 ? 'border-indigo-200' : 'border-gray-200/50'}`}>
//                   <div className="flex items-start gap-3">
//                     <div className={`flex-shrink-0 w-8 h-8 rounded-lg text-white flex items-center justify-center font-bold text-xs ${idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gradient-to-br from-indigo-500 to-purple-600'}`}>
//                       {idx + 1}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-indigo-600 transition-colors">
//                         {f.Title}
//                       </h4>
//                       <p className="text-xs text-gray-500 mt-2 line-clamp-2">
//                         {f.Summary || (f.Content ? String(f.Content).slice(0,60) + "..." : "")}
//                       </p>
//                       <div className="flex items-center justify-between mt-3">
//                         {f.Technology && (
//                           <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md font-medium">
//                             {f.Technology}
//                           </span>
//                         )}
//                         <a 
//                           href={`/article/${encodeURIComponent(f.Slug) || f.id}`} 
//                           className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors"
//                         >
//                           Read →
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </aside>
//       </main>

//       {/* About / Footer */}
//       <footer id="about" className="bg-gradient-to-r from-gray-50 to-indigo-50/30 border-t border-gray-200/50">
//         <div className="max-w-7xl mx-auto px-6 py-16">
//           <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200/50">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//               <div>
//                 <h4 className="text-2xl font-bold text-gray-900 mb-4">About eCloudWorx University</h4>
//                 <p className="text-gray-600 leading-relaxed mb-6">
//                   A comprehensive knowledge base built by industry professionals. Our mission is to make complex technology concepts accessible and actionable for developers, engineers, and technology enthusiasts worldwide.
//                 </p>
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                     </svg>
//                     Expert Curated
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                     Always Updated
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center md:text-right">
//                 <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold shadow-lg">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//                   </svg>
//                   Keep Learning
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="text-center text-sm text-gray-500 mt-8">
//             © {new Date().getFullYear()} eCloudWorx University — Built with Strapi & React
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback } from "react";

/*
  Updated UniversityLanding.jsx
  - Uses Vite env: import.meta.env.VITE_STRAPI_URL or fallback
  - Adds a modal reader: openReaderForSlug(slug) fetches article by Slug and displays content
  - No react-router-dom required (plain anchors/buttons)
  - Keeps layout: left categories, center articles, right featured
*/

const STRAPI = import.meta.env.VITE_STRAPI_URL || "http://localhost:7200";
const LOGO_PATH = "/university.png";

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString();
  } catch (e) {
    return iso;
  }
}

/* Helper: convert plain text to paragraphs */
function textToParagraphs(text) {
  if (!text) return null;
  const parts = String(text).split(/\n{1,2}/).map((p) => p.trim()).filter(Boolean);
  return parts.map((p, i) => <p key={i} className="mb-4 leading-relaxed text-gray-700">{p}</p>);
}

export default function UniversityLanding() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]); // normalized articles
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reader modal state
  const [readerOpen, setReaderOpen] = useState(false);
  const [readerLoading, setReaderLoading] = useState(false);
  const [readerError, setReaderError] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);

  // Fetch categories
  useEffect(() => {
    (async function fetchCategories() {
      try {
        const res = await fetch(`${STRAPI}/api/categories`);
        if (!res.ok) throw new Error(`Categories fetch failed: ${res.status}`);
        const json = await res.json();
        const list = (json.data || json).map((c) => {
          if (c.attributes) return { id: c.id, name: c.attributes.Name || c.attributes.name };
          return { id: c.id, name: c.Name || c.name || "Category" };
        });
        setCategories(list);
      } catch (err) {
        console.error("Categories error:", err);
      }
    })();
  }, []);

  // Fetch all articles
  useEffect(() => {
    fetchAllArticles();
  }, []);

  async function fetchAllArticles() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${STRAPI}/api/articles?pagination[page]=1&pagination[pageSize]=50`);
      if (!res.ok) throw new Error(`Articles fetch failed: ${res.status}`);
      const json = await res.json();
      const raw = json.data || json || [];
      const mapped = raw.map((it) => {
        const item = it.attributes ? { id: it.id, ...it.attributes } : it;
        return {
          id: it.id ?? item.id,
          Title: item.Title ?? item.title ?? "",
          Slug: item.Slug ?? item.slug ?? item.Slug ?? "",
          Summary: item.Summary ?? item.summary ?? (item.Content ? String(item.Content).slice(0, 200) : ""),
          Content: item.Content ?? item.content ?? "",
          Technology: item.Technology ?? item.technology ?? "",
          PublishedDate: item.PublishedDate ?? item.publishedAt ?? "",
          Published: item.Published ?? item.published ?? true,
          Categories: item.category || item.Categories || item.categories || null,
        };
      });

      mapped.sort((a,b) => new Date(b.PublishedDate) - new Date(a.PublishedDate));

      setArticles(mapped);
      setFilteredArticles(mapped);
      setFeatured(mapped.filter(a => a.Published !== false).slice(0,4));
    } catch (err) {
      console.error(err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  // Filtering
  useEffect(() => {
    let res = [...articles];
    if (activeCategory) {
      const catLower = (activeCategory.name || "").toLowerCase();
      res = res.filter(a => {
        const tech = (a.Technology || "").toLowerCase();
        if (tech.includes(catLower)) return true;
        if (Array.isArray(a.Categories)) {
          return a.Categories.some(c => ((c.name || c.Name || (c.attributes && (c.attributes.Name||c.attributes.name)) || "")).toLowerCase() === catLower);
        }
        return false;
      });
    }
    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      res = res.filter(a =>
        (a.Title || "").toLowerCase().includes(q) ||
        (a.Summary || "").toLowerCase().includes(q) ||
        (a.Content || "").toLowerCase().includes(q)
      );
    }
    setFilteredArticles(res);
  }, [articles, query, activeCategory]);

  function handleCategoryClick(cat) {
    setActiveCategory(cat || null);
  }
  function clearFilters() {
    setActiveCategory(null);
    setQuery("");
    setFilteredArticles(articles);
  }

  // ---------------------
  // Reader modal functions
  // ---------------------
  const openReaderForSlug = useCallback(async (slug) => {
    if (!slug) return;
    setReaderOpen(true);
    setReaderLoading(true);
    setReaderError(null);
    setCurrentArticle(null);
    try {
      // Filter by Slug field (adjust if your field name differs)
      const res = await fetch(`${STRAPI}/api/articles?filters[Slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`);
      if (!res.ok) throw new Error(`Article fetch failed: ${res.status}`);
      const json = await res.json();
      // support both wrapped (data[]) and flat
      const raw = (json.data && json.data[0]) ? json.data[0] : (json[0] || null);
      if (!raw) throw new Error("Article not found");
      const item = raw.attributes ? { id: raw.id, ...raw.attributes } : raw;
      const mapped = {
        id: raw.id ?? item.id,
        Title: item.Title ?? item.title ?? "",
        Slug: item.Slug ?? item.slug ?? "",
        Content: item.Content ?? item.content ?? "",
        Summary: item.Summary ?? item.summary ?? "",
        Technology: item.Technology ?? item.technology ?? "",
        PublishedDate: item.PublishedDate ?? item.publishedAt ?? "",
      };
      setCurrentArticle(mapped);
    } catch (err) {
      console.error("Reader error:", err);
      setReaderError(String(err));
    } finally {
      setReaderLoading(false);
    }
  }, []);

  const closeReader = useCallback(() => {
    setReaderOpen(false);
    setCurrentArticle(null);
    setReaderError(null);
  }, []);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") closeReader(); }
    if (readerOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [readerOpen, closeReader]);

  function overlayClick(e) {
    if (e.target === e.currentTarget) closeReader();
  }

  // ---------------------
  // Render
  // ---------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={LOGO_PATH} alt="ecloudWorx" className="h-12 w-12 object-contain rounded-xl shadow-sm" />
            <div>
              <h1 className="text-2xl font-bold">eCloudWorx <span className="text-indigo-600">University</span></h1>
              <p className="text-xs text-gray-500">Concepts explained by industry veterans — practical & curated</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 items-center text-sm text-gray-700">
            <a href="#featured" className="hover:text-indigo-600">Featured</a>
            <a href="#articles" className="hover:text-indigo-600">All Articles</a>
            <a href="#about" className="hover:text-indigo-600">About</a>
          </nav>
        </div>
      </header>

      {/* Hero (kept from your layout) */}
      <section className="relative py-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Master Technology with <span className="text-indigo-600 block">Expert Knowledge</span></h2>
          <p className="text-gray-600 mb-6">Dive into curated content crafted by industry professionals — cloud, infra, and practical guides.</p>
        </div>
      </section>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: categories */}
        <aside className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm sticky top-28">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Categories</h3>
              <button onClick={clearFilters} className="text-xs text-indigo-600">Clear</button>
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleCategoryClick(null)} className={`w-full text-left px-3 py-2 rounded-lg ${!activeCategory ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-50"}`}>All</button>
              </li>
              {categories.length===0 ? (
                <li className="text-sm text-gray-500 px-3 py-2">No categories</li>
              ) : categories.map(cat => (
                <li key={cat.id}>
                  <button onClick={() => handleCategoryClick(cat)} className={`w-full text-left px-3 py-2 rounded-lg ${activeCategory?.id===cat.id ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-50"}`}>{cat.name}</button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Center: articles */}
        <section id="articles" className="lg:col-span-7">
          <div className="flex gap-3 mb-6">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by keyword, title or content" className="flex-1 rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            <button onClick={() => { /* filtering handled by useEffect */ }} className="px-4 py-3 rounded-lg bg-indigo-600 text-white">Search</button>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">{activeCategory ? `${activeCategory.name} Articles` : "All Articles"} <span className="text-gray-500 text-sm">({filteredArticles.length})</span></h2>
          </div>

          {loading && <div className="text-gray-500">Loading articles...</div>}
          {error && <div className="text-red-500">Error: {String(error)}</div>}

          {filteredArticles.length===0 && !loading && (
            <div className="bg-white rounded-xl p-6 border text-gray-500">No articles found. Try another search or category.</div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {filteredArticles.map(a => (
              <article key={a.id} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center font-bold">
                    {a.Title ? a.Title.split(' ').slice(0,2).map(w => w[0]).join('') : 'KB'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-indigo-700">{a.Title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{a.Summary || (a.Content ? String(a.Content).slice(0,140) : 'No summary')}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-xs text-gray-400">{a.Technology || ''} · {a.PublishedDate ? formatDate(a.PublishedDate) : ''}</div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => openReaderForSlug(a.Slug || a.id)} className="text-indigo-600 text-sm hover:underline">Read More →</button>
                        <a href={`/article/${encodeURIComponent(a.Slug) || a.id}`} className="text-sm text-gray-400 hover:text-gray-600">Permalink</a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Right: featured */}
        <aside id="featured" className="lg:col-span-3">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 shadow sticky top-28">
            <h4 className="text-lg font-semibold mb-3">Featured Articles</h4>
            {featured.length===0 ? <div className="text-sm text-gray-500">No featured content</div> : (
              <ul className="space-y-3">
                {featured.map(f => (
                  <li key={f.id} className="bg-white p-3 rounded-lg shadow-sm">
                    <h5 className="font-semibold">{f.Title}</h5>
                    <p className="text-xs text-gray-500 mt-1">{f.Summary || (f.Content ? String(f.Content).slice(0,80) : '')}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">{f.Technology || ''}</span>
                      <button onClick={() => openReaderForSlug(f.Slug || f.id)} className="text-indigo-600 text-sm hover:underline">Read</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </main>

      {/* About / Footer */}
      <footer id="about" className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl p-6 shadow">
            <h4 className="font-semibold">About eCloudWorx University</h4>
            <p className="text-sm text-gray-600 mt-2">
              A knowledge base driven site built on Strapi CMS. Our mission: make industry knowledge accessible and actionable — "Concepts explained by industry veterans".
            </p>
          </div>
          <div className="text-center text-xs text-gray-400 mt-6">© {new Date().getFullYear()} eCloudWorx University — Built with Strapi & React</div>
        </div>
      </footer>

      {/* Reader Modal */}
      {readerOpen && (
        <div onClick={overlayClick} className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-6 overflow-auto" role="dialog" aria-modal="true">
          <div className="relative max-w-3xl w-full bg-white rounded-xl shadow-xl p-6 mt-12">
            <button onClick={closeReader} className="absolute right-4 top-4 text-gray-500 hover:text-gray-800">Close ✕</button>

            {readerLoading && <div className="text-gray-600">Loading article...</div>}
            {readerError && <div className="text-red-500">Error loading article: {readerError}</div>}

            {!readerLoading && currentArticle && (
              <article>
                <h2 className="text-2xl font-bold text-indigo-700 mb-2">{currentArticle.Title}</h2>
                <div className="text-xs text-gray-400 mb-4">{currentArticle.Technology || ''} · {currentArticle.PublishedDate ? formatDate(currentArticle.PublishedDate) : ''}</div>

                {/* Plain text rendering */}
                <div className="prose max-w-none">
                  {textToParagraphs(currentArticle.Content)}
                </div>

                {/* If you store HTML in Content and want to render it:
                    1) Install DOMPurify: npm install dompurify
                    2) import DOMPurify and sanitize:
                       import DOMPurify from 'dompurify';
                       const clean = DOMPurify.sanitize(currentArticle.Content);
                       <div dangerouslySetInnerHTML={{ __html: clean }} />
                    Don't use dangerouslySetInnerHTML without sanitizing.
                */}
              </article>
            )}

            {!readerLoading && !currentArticle && !readerError && (
              <div className="text-gray-500">No article content to display.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
