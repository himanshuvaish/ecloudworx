// import React, { useEffect, useState, useCallback } from "react";

// /* Enhanced animations CSS injection */
// const __eclw_enhanced_styles = `
// @keyframes eclw-fadeUp {
//   from { opacity: 0; transform: translateY(20px); }
//   to   { opacity: 1; transform: translateY(0); }
// }

// @keyframes eclw-fadeIn {
//   from { opacity: 0; }
//   to   { opacity: 1; }
// }

// @keyframes eclw-slideDown {
//   from { opacity: 0; transform: translateY(-20px) scale(0.95); }
//   to   { opacity: 1; transform: translateY(0) scale(1); }
// }

// @keyframes eclw-pulse {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.6; }
// }

// @keyframes eclw-scaleIn {
//   from { opacity: 0; transform: scale(0.9); }
//   to   { opacity: 1; transform: scale(1); }
// }

// @keyframes eclw-shimmer {
//   0% { background-position: -200px 0; }
//   100% { background-position: calc(200px + 100%) 0; }
// }

// .eclw-fade-up { 
//   animation: eclw-fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; 
// }

// .eclw-fade-in { 
//   animation: eclw-fadeIn 0.4s ease-out both; 
// }

// .eclw-modal { 
//   animation: eclw-slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; 
// }

// .eclw-scale-in { 
//   animation: eclw-scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; 
// }

// .eclw-stagger-1 { animation-delay: 0.1s; }
// .eclw-stagger-2 { animation-delay: 0.2s; }
// .eclw-stagger-3 { animation-delay: 0.3s; }
// .eclw-stagger-4 { animation-delay: 0.4s; }

// /* Enhanced hover effects */
// .eclw-hover-lift {
//   transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
// }

// .eclw-hover-lift:hover {
//   transform: translateY(-4px);
//   box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
// }

// .eclw-hover-scale {
//   transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
// }

// .eclw-hover-scale:hover {
//   transform: scale(1.02);
// }

// /* Modern gradient backgrounds */
// .eclw-gradient-bg {
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// }

// .eclw-gradient-blue {
//   background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
// }

// .eclw-gradient-card {
//   background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%);
//   backdrop-filter: blur(10px);
// }

// /* Loading shimmer effect */
// .eclw-shimmer {
//   background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
//   background-size: 400% 100%;
//   animation: eclw-shimmer 1.4s ease-in-out infinite;
// }

// /* Modern button styles */
// .eclw-btn-primary {
//   background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
//   transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
// }

// .eclw-btn-primary:hover {
//   box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
//   transform: translateY(-1px);
// }

// /* Enhanced search input */
// .eclw-search-focus {
//   transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
// }

// .eclw-search-focus:focus {
//   box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1), 0 10px 25px rgba(0, 0, 0, 0.1);
//   transform: translateY(-1px);
// }

// @media (prefers-reduced-motion: reduce) {
//   .eclw-fade-up,
//   .eclw-fade-in,
//   .eclw-modal,
//   .eclw-scale-in,
//   .eclw-hover-lift,
//   .eclw-hover-scale {
//     animation: none !important;
//     transition: none !important;
//   }
// }
// `;

// if (typeof document !== 'undefined' && !document.getElementById('eclw-enhanced-animations-style')) {
//   const s = document.createElement('style');
//   s.id = 'eclw-enhanced-animations-style';
//   s.innerHTML = __eclw_enhanced_styles;
//   document.head.appendChild(s);
// }

// const STRAPI = import.meta.env.VITE_STRAPI_URL || "/api";
// const LOGO_PATH = "/university.png";

// function formatDate(iso) {
//   if (!iso) return "";
//   try {
//     return new Date(iso).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   } catch (e) {
//     return iso;
//   }
// }

// // Enhanced Loading Spinner
// function LoadingSpinner() {
//   return (
//     <div className="flex items-center justify-center py-16 eclw-fade-in">
//       <div className="relative">
//         <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
//         <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
//       </div>
//       <p className="ml-4 text-gray-600 font-medium">Loading articles...</p>
//     </div>
//   );
// }

// // Enhanced Error Component
// function ErrorMessage({ message, onRetry }) {
//   return (
//     <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-8 text-center eclw-scale-in">
//       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//         <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//         </svg>
//       </div>
//       <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
//       <p className="text-red-600 mb-6">{message}</p>
//       {onRetry && (
//         <button
//           onClick={onRetry}
//           className="eclw-btn-primary text-white px-6 py-3 rounded-lg font-semibold"
//         >
//           Try Again
//         </button>
//       )}
//     </div>
//   );
// }

// // Enhanced Article Card
// function KnowledgeBaseCard({ article, onRead, showStats = true, index = 0 }) {
//   const readTime = Math.ceil((article.ContentLength || article.Content?.length || 1000) / 200) || 15;
//   const views = Math.floor(Math.random() * 5000) + 1000;

//   return (
//     <div className={`eclw-hover-lift eclw-gradient-card rounded-xl border border-gray-200 overflow-hidden group eclw-fade-up eclw-stagger-${(index % 4) + 1}`}>
//       <div className="p-6">
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex-1">
//             <div className="flex items-center gap-2 mb-3">
//               {article.Technology && (
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//                   {article.Technology}
//                 </span>
//               )}
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
//                 {article.Technology === 'AWS Management' ? 'aws' : 
//                  article.Technology === 'Azure Integration' ? 'azure' : 
//                  article.Technology === 'Google Cloud' ? 'gcp' : 'cloud'}
//               </span>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
//               {article.Title || "Untitled Article"}
//             </h3>
//           </div>
//           <div className="flex items-center ml-4">
//             <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
//               <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
//           {article.Summary || (article.Content ? String(article.Content).slice(0, 160) + '...' : 'Learn how to efficiently manage resources across multiple cloud platforms using eCloudWorx unified dashboard. This comprehensive guide covers...')}
//         </p>

//         {showStats && (
//           <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-1">
//                 <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <span className="font-medium">{readTime} min read</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//                 <span className="font-medium">{views.toLocaleString()} views</span>
//               </div>
//             </div>
//             <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{formatDate(article.PublishedDate)}</span>
//           </div>
//         )}

//         <div className="pt-4 border-t border-gray-100">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
//                 <span className="text-white text-xs font-bold">eC</span>
//               </div>
//               <span className="text-sm font-medium text-gray-700">Team eCloudWorx</span>
//             </div>
//             <button
//               onClick={() => onRead(article.Slug)}
//               className="eclw-btn-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
//             >
//               Read Article →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Enhanced Featured Hero Card
// function FeaturedHeroCard({ article, onRead }) {
//   const readTime = Math.ceil((article.ContentLength || article.Content?.length || 1000) / 200) || 15;
//   const views = Math.floor(Math.random() * 5000) + 2000;

//   return (
//     <div className="eclw-gradient-bg rounded-2xl border border-indigo-200 p-8 relative overflow-hidden text-white eclw-fade-up">
//       <div className="absolute top-6 right-6">
//         <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-white text-indigo-600 shadow-lg">
//           ⭐ FEATURED
//         </span>
//       </div>

//       <div className="max-w-4xl relative z-10">
//         <div className="mb-6">
//           <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white/90 mb-4">
//             <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
//             Latest Article
//           </div>
//           <h2 className="text-3xl font-bold mb-4 leading-tight">
//             {article.Title || "Introduction to DevOps and CI/CD Pipeline Management"}
//           </h2>
//         </div>

//         <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-3xl">
//           {article.Summary || "TL;DR DevOps integrates development and operations to speed up software delivery using automated CI/CD pipelines. Learn best practices for automation, version control, and security scanning."}
//         </p>

//         <div className="flex items-center gap-3 mb-8 flex-wrap">
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-indigo-600">
//             multi-cloud
//           </span>
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
//             aws
//           </span>
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
//             devops
//           </span>
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
//             cicd
//           </span>
//         </div>

//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <div className="flex items-center space-x-6 text-sm text-white/80">
//             <div className="flex items-center space-x-2">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span className="font-medium">{readTime} min read</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//               </svg>
//               <span className="font-medium">{views.toLocaleString()} views</span>
//             </div>
//             <span className="font-medium">{formatDate(article.PublishedDate)}</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//                 <span className="text-indigo-600 text-xs font-bold">eC</span>
//               </div>
//               <span className="text-sm font-medium">Team eCloudWorx</span>
//             </div>
//             <button
//               onClick={() => onRead(article.Slug)}
//               className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all hover:shadow-lg"
//             >
//               Read Article
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Decorative elements */}
//       <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
//       <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
//     </div>
//   );
// }

// // Enhanced Stats Component
// function KnowledgeBaseStats({ articles }) {
//   const totalViews = articles.length * 1500;

//   return (
//     <div className="eclw-gradient-blue rounded-xl p-6 text-white eclw-hover-scale">
//       <div className="text-center">
//         <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//           </svg>
//         </div>
//         <h3 className="text-lg font-bold mb-6">Knowledge Base Stats</h3>
//         <div className="space-y-4">
//           <div>
//             <div className="text-3xl font-bold">{articles.length}</div>
//             <div className="text-indigo-200 text-sm">Total Articles</div>
//           </div>
//           <div className="border-t border-white/20 pt-4">
//             <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
//             <div className="text-indigo-200 text-sm">Total Views</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Enhanced Quick Start Guide
// function QuickStartGuide() {
//   const [completed, setCompleted] = useState([false, false, false]);

//   const toggleStep = (index) => {
//     const newCompleted = [...completed];
//     newCompleted[index] = !newCompleted[index];
//     setCompleted(newCompleted);
//   };

//   return (
//     <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 eclw-hover-lift">
//       <div className="flex items-center mb-6">
//         <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
//           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//           </svg>
//         </div>
//         <h3 className="font-bold text-green-800 text-lg">Quick Start</h3>
//       </div>
//       <div className="space-y-4">
//         {[
//           "Set up your account",
//           "Configure cloud providers", 
//           "Deploy your first resource"
//         ].map((step, index) => (
//           <div key={index} className="flex items-center space-x-3 group cursor-pointer" onClick={() => toggleStep(index)}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
//               completed[index] 
//                 ? 'bg-green-500 text-white' 
//                 : 'bg-green-100 text-green-600 group-hover:bg-green-200'
//             }`}>
//               {completed[index] ? (
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               ) : (
//                 <span className="text-xs font-bold">{index + 1}</span>
//               )}
//             </div>
//             <span className={`text-sm transition-all ${
//               completed[index] ? 'text-green-600 line-through' : 'text-green-700 group-hover:text-green-800'
//             }`}>
//               {step}
//             </span>
//           </div>
//         ))}
//       </div>
//       <button className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg text-sm font-bold hover:shadow-lg transition-all">
//         Get Started
//       </button>
//     </div>
//   );
// }

// // Enhanced Recent Updates
// function RecentUpdates() {
//   const updates = [
//     { title: "New Azure Integration Features", date: "Sep 8, 2025", type: "feature" },
//     { title: "Security Best Practices Updated", date: "Sep 7, 2025", type: "update" },
//     { title: "GCP Cost Optimization Guide", date: "Sep 6, 2025", type: "guide" },
//     { title: "Multi-Cloud Deployment Tutorial", date: "Sep 5, 2025", type: "tutorial" }
//   ];

//   const typeColors = {
//     feature: "from-blue-500 to-indigo-600",
//     update: "from-orange-500 to-red-500", 
//     guide: "from-green-500 to-emerald-600",
//     tutorial: "from-purple-500 to-pink-600"
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-6 eclw-hover-lift">
//       <h3 className="font-bold text-gray-900 mb-6 flex items-center text-lg">
//         <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
//           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </div>
//         Recent Updates
//       </h3>
//       <div className="space-y-4">
//         {updates.map((update, index) => (
//           <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
//             <div className="flex-shrink-0 mt-1">
//               <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${typeColors[update.type]}`}></div>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-semibold text-gray-900 mb-1">{update.title}</p>
//               <p className="text-xs text-gray-500">{update.date}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function UniversityLanding() {
//   const [categories, setCategories] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const [featured, setFeatured] = useState([]);
//   const [query, setQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Reader modal state
//   const [readerOpen, setReaderOpen] = useState(false);
//   const [readerLoading, setReaderLoading] = useState(false);
//   const [readerError, setReaderError] = useState(null);
//   const [currentArticle, setCurrentArticle] = useState(null);

//   // Animation state
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // All your existing useEffect hooks and functions remain the same...
//   // [Previous useEffect and function implementations stay unchanged]

//   // Fetch categories
//   useEffect(() => {
//     (async function fetchCategories() {
//       try {
//         const res = await fetch(`${STRAPI}/categories`);
//         if (!res.ok) throw new Error(`Categories fetch failed: ${res.status}`);
//         const json = await res.json();
//         const list = (json.data || json).map((c) => {
//           if (c.attributes) return { id: c.id, name: c.attributes.Name || c.attributes.name };
//           return { id: c.id, name: c.Name || c.name || "Category" };
//         });
//         setCategories(list);
//       } catch (err) {
//         console.error("Categories error:", err);
//       }
//     })();
//   }, []);

//   // Fetch all articles
//   useEffect(() => {
//     fetchAllArticles();
//   }, []);

//   async function fetchAllArticles() {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${STRAPI}/kb-articles?populate=*`);
//       if (!res.ok) throw new Error(`Articles fetch failed: ${res.status}`);
//       const json = await res.json();
//       const raw = json.data || json || [];
//       const mapped = raw.map((article) => {
//         // Extract title from Title block (rich text)
//         const titleText = article.Title?.[0]?.children?.[0]?.text || "Untitled Article";

//         // Extract categories for Technology field
//         const technology = article.categories?.[0]?.name || "";

//         // Generate summary from content blocks
//         let summary = "";
//         if (article.content && Array.isArray(article.content)) {
//           for (const block of article.content) {
//             if (block.__component === "shared.text-block" && block.body) {
//               // Extract text from rich text body
//               const textContent = block.body
//                 .map(p => p.children?.map(c => c.text).join('') || '')
//                 .join(' ')
//                 .replace(/#+/g, '') // Remove markdown headers
//                 .trim();
//               if (textContent && textContent.length > 10) {
//                 summary = textContent.slice(0, 200) + "...";
//                 break;
//               }
//             }
//             if (block.__component === "shared.section-block" && block.section) {
//               // Extract text from section block
//               const sectionText = block.section
//                 .map(p => p.children?.map(c => c.text).join('') || '')
//                 .join(' ')
//                 .replace(/<[^>]*>/g, '') // Remove HTML tags
//                 .replace(/#+/g, '') // Remove markdown headers
//                 .trim();
//               if (sectionText && sectionText.length > 10) {
//                 summary = sectionText.slice(0, 200) + "...";
//                 break;
//               }
//             }
//           }
//         }

//         // Generate content preview for reading time calculation
//         let contentLength = 0;
//         if (article.content && Array.isArray(article.content)) {
//           article.content.forEach(block => {
//             if (block.__component === "shared.text-block" && block.body) {
//               contentLength += block.body.map(p => p.children?.map(c => c.text).join('') || '').join(' ').length;
//             }
//             if (block.__component === "shared.section-block" && block.section) {
//               contentLength += block.section.map(p => p.children?.map(c => c.text).join('') || '').join(' ').length;
//             }
//             if (block.__component === "shared.code-block" && block.code) {
//               contentLength += block.code.length;
//             }
//           });
//         }

//         return {
//           id: article.id,
//           documentId: article.documentId,
//           Title: titleText,
//           Slug: article.documentId, // Using documentId as slug since no explicit slug field
//           Summary: summary || "Explore this comprehensive guide covering cloud architecture best practices and implementation strategies.",
//           Content: article.content || [],
//           ContentLength: contentLength,
//           Technology: technology,
//           PublishedDate: article.publishedAt || article.createdAt,
//           Published: article.publishedAt ? true : false,
//           Categories: article.categories || [],
//           Authors: article.authors || [],
//         };
//       });

//       mapped.sort((a,b) => new Date(b.PublishedDate) - new Date(a.PublishedDate));
//       setArticles(mapped);
//       setFilteredArticles(mapped);
//       setFeatured(mapped.filter(a => a.Published !== false).slice(0,4));
//     } catch (err) {
//       console.error(err);
//       setError(String(err));
//     } finally {
//       setLoading(false);
//     }
//   }

//   // All other existing functions remain the same...
//   // [All existing functions like filtering logic, modal functions, etc.]

//   // Filtering logic
//   useEffect(() => {
//     let res = [...articles];
//     if (activeCategory) {
//       const catLower = (activeCategory.name || "").toLowerCase();
//       res = res.filter(a => {
//         const tech = (a.Technology || "").toLowerCase();
//         if (tech.includes(catLower)) return true;
//         if (Array.isArray(a.Categories)) {
//           return a.Categories.some(c => ((c.name || c.Name || (c.attributes && (c.attributes.Name||c.attributes.name)) || "")).toLowerCase() === catLower);
//         }
//         return false;
//       });
//     }
//     if (query && query.trim()) {
//       const q = query.trim().toLowerCase();
//       res = res.filter(a =>
//         (a.Title || "").toLowerCase().includes(q) ||
//         (a.Summary || "").toLowerCase().includes(q) ||
//         (a.Content || "").toLowerCase().includes(q)
//       );
//     }
//     setFilteredArticles(res);
//   }, [articles, query, activeCategory]);

//   function handleCategoryClick(cat) {
//     setActiveCategory(cat || null);
//   }

//   function clearFilters() {
//     setActiveCategory(null);
//     setQuery("");
//     setFilteredArticles(articles);
//   }

//   // Reader modal functions
//   const openReaderForSlug = useCallback(async (slug) => {
//     if (!slug) return;
//     setReaderOpen(true);
//     setReaderLoading(true);
//     setReaderError(null);
//     setCurrentArticle(null);

//     try {
//       const res = await fetch(`${STRAPI}/kb-articles?filters[documentId][$eq]=${encodeURIComponent(slug)}&populate=*`);
//       if (!res.ok) throw new Error(`Article fetch failed: ${res.status}`);
//       const json = await res.json();
//       const raw = (json.data && json.data[0]) ? json.data[0] : (json[0] || null);
//       if (!raw) throw new Error("Article not found");

//       // Extract title from Title block (rich text)
//       const titleText = raw.Title?.[0]?.children?.[0]?.text || "Untitled Article";

//       // Extract categories for Technology field
//       const technology = raw.categories?.[0]?.name || "";

//       const mapped = {
//         id: raw.id,
//         documentId: raw.documentId,
//         Title: titleText,
//         Slug: raw.documentId,
//         Content: raw.content || [],
//         Summary: raw.Summary || "",
//         Technology: technology,
//         PublishedDate: raw.publishedAt || raw.createdAt,
//         Authors: raw.authors || [],
//         Categories: raw.categories || [],
//       };
//       setCurrentArticle(mapped);
//     } catch (err) {
//       console.error("Reader error:", err);
//       setReaderError(String(err));
//     } finally {
//       setReaderLoading(false);
//     }
//   }, []);

//   const closeReader = useCallback(() => {
//     setReaderOpen(false);
//     setCurrentArticle(null);
//     setReaderError(null);
//   }, []);

//   useEffect(() => {
//     function onKey(e) {
//       if (e.key === "Escape") closeReader();
//     }
//     if (readerOpen) window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [readerOpen, closeReader]);

//   function overlayClick(e) {
//     if (e.target === e.currentTarget) closeReader();
//   }

//   const processContentForDisplay = (content) => {
//     if (!content || !Array.isArray(content)) return "";

//     let html = '';

//     content.forEach((block, index) => {
//       switch (block.__component) {
//         case 'shared.text-block':
//           if (block.body && Array.isArray(block.body)) {
//             block.body.forEach(paragraph => {
//               if (paragraph.children) {
//                 const text = paragraph.children.map(child => child.text || '').join('');
//                 if (text.trim()) {
//                   // Check if it's a header (starts with # characters)
//                   if (text.startsWith('#')) {
//                     const headerLevel = (text.match(/^#+/) || [''])[0].length;
//                     const headerText = text.replace(/^#+\s*/, '');
//                     html += `<h${Math.min(headerLevel, 6)} class="text-${4-Math.min(headerLevel-1, 2)}xl font-bold text-gray-900 mt-8 mb-4">${headerText}</h${Math.min(headerLevel, 6)}>`;
//                   } else {
//                     html += `<p class="mb-4 text-gray-700 leading-relaxed">${text}</p>`;
//                   }
//                 }
//               }
//             });
//           }
//           break;

//         case 'shared.section-block':
//           if (block.section && Array.isArray(block.section)) {
//             block.section.forEach(paragraph => {
//               if (paragraph.children) {
//                 const text = paragraph.children.map(child => child.text || '').join('');
//                 if (text.trim()) {
//                   // Remove HTML tags and convert to proper formatting
//                   const cleanText = text
//                     .replace(/<h2>/g, '').replace(/<\/h2>/g, '')
//                     .replace(/<p>/g, '').replace(/<\/p>/g, '')
//                     .replace(/<ul>/g, '').replace(/<\/ul>/g, '')
//                     .replace(/<li>/g, '• ').replace(/<\/li>/g, '')
//                     .replace(/&lt;/g, '<').replace(/&gt;/g, '>');

//                   if (cleanText.startsWith('## ')) {
//                     const headerText = cleanText.replace(/^## /, '');
//                     html += `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${headerText}</h2>`;
//                   } else if (cleanText.startsWith('• ')) {
//                     html += `<li class="ml-4 mb-2 text-gray-700">${cleanText.replace(/^• /, '')}</li>`;
//                   } else if (cleanText.trim()) {
//                     html += `<p class="mb-4 text-gray-700 leading-relaxed">${cleanText}</p>`;
//                   }
//                 }
//               }
//             });
//           }
//           break;

//         case 'shared.code-block':
//           if (block.code) {
//             const language = block.language || 'bash';
//             // FIXED: Clean HTML tags from code content and handle syntax highlighting properly
//             let cleanCode = block.code
//               .replace(/<h3>.*?<\/h3>/gi, '')  // Remove h3 tags
//               .replace(/<pre><code>/gi, '')     // Remove pre/code opening tags
//               .replace(/<\/code><\/pre>/gi, '') // Remove pre/code closing tags
//               .replace(/<[^>]*>/g, '')          // Remove any remaining HTML tags
//               .replace(/&lt;/g, '<')            // Decode HTML entities
//               .replace(/&gt;/g, '>')
//               .replace(/&amp;/g, '&')
//               .trim();

//             html += `
//               <div class="my-6">
//                 ${block.caption ? `<p class="text-sm text-gray-600 mb-3 font-medium">${block.caption}</p>` : ''}
//                 <div class="bg-gray-900 rounded-lg overflow-hidden">
//                   <div class="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
//                     <span class="text-xs text-gray-400 font-mono">${language}</span>
//                     <button 
//                       onclick="navigator.clipboard.writeText(\`${cleanCode.replace(/\`/g, '\\`')}\`)"
//                       class="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700"
//                       title="Copy code"
//                     >
//                       Copy
//                     </button>
//                   </div>
//                   <pre class="p-4 overflow-x-auto text-sm"><code class="language-${language} text-gray-100">${cleanCode}</code></pre>
//                 </div>
//               </div>
//             `;
//           }
//           break;

//         case 'shared.callout-block':
//           if (block.message && Array.isArray(block.message)) {
//             const messageText = block.message
//               .map(p => p.children?.map(c => c.text).join('') || '')
//               .join(' ');
//             const style = block.style || 'info';
//             const bgColor = style === 'warning' ? 'bg-yellow-50 border-yellow-200' : 
//                            style === 'error' ? 'bg-red-50 border-red-200' :
//                            'bg-blue-50 border-blue-200';
//             html += `
//               <div class="my-6 p-4 ${bgColor} border rounded-lg">
//                 <p class="text-gray-700">${messageText}</p>
//               </div>
//             `;
//           }
//           break;

//         case 'shared.video-block':
//           if (block.url) {
//             html += `
//               <div class="my-6">
//                 ${block.caption ? `<p class="text-sm text-gray-600 mb-2">${block.caption}</p>` : ''}
//                 <div class="aspect-video">
//                   <iframe 
//                     src="${block.url.replace('watch?v=', 'embed/')}" 
//                     class="w-full h-full rounded-lg"
//                     frameborder="0" 
//                     allowfullscreen>
//                   </iframe>
//                 </div>
//               </div>
//             `;
//           }
//           break;

//         case 'shared.image-block':
//           // FIXED: Handle both old structure (block.image.url) and new structure (block.url)
//           const imageUrl = block.url || (block.image && block.image.url);

//           if (imageUrl) {
//             const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : STRAPI + imageUrl;
//             html += `
//               <div class="my-6">
//                 <img 
//                   src="${fullImageUrl}" 
//                   alt="${block.alt || (block.image && block.image.alternativeText) || 'Article image'}"
//                   class="w-full h-auto rounded-lg shadow-md"
//                   onError="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjAgMTUwTDE2MCAyMDBMMjQwIDEyMEwyODAgMTgwSDE2MFoiIGZpbGw9IiNEMUQ1REIiLz4KPGNpcmNsZSBjeD0iMTQwIiBjeT0iMTEwIiByPSIyMCIgZmlsbD0iI0QxRDVEQiIvPgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOUI5Q0E0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPgo='; this.parentElement.classList.add('bg-gray-50', 'flex', 'items-center', 'justify-center', 'min-h-48');"
//                 />
//                 ${block.caption ? `<p class="text-sm text-gray-600 italic text-center mt-2">${block.caption}</p>` : ''}
//               </div>
//             `;
//           } else if (block.alt || block.caption) {
//             // Fallback for when image data is not available
//             html += `
//               <div class="my-6 text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
//                 <div class="text-gray-400 mb-3">
//                   <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 ${block.caption ? `<p class="text-sm text-gray-600 italic font-medium">${block.caption}</p>` : ''}
//                 ${block.alt ? `<p class="text-xs text-gray-500 mt-1">${block.alt}</p>` : ''}
//               </div>
//             `;
//           }
//           break;

//         default:
//           // Handle any other block types
//           console.log('Unknown block type:', block.__component);
//           break;
//       }
//     });

//     return html;
//   };

//   return (
//     <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 ${isVisible ? 'eclw-fade-in' : 'opacity-0'}`}>
//       {/* Enhanced Header */}
//       <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40 eclw-fade-up">
//         <div className="px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-4">
//               <img 
//                 src={LOGO_PATH} 
//                 alt="eCloudWorx University" 
//                 className="h-10 w-auto object-contain eclw-hover-scale"
//                 onError={(e) => { e.target.style.display = 'none'; }}
//               />
//               <div>
//                 <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                   eCloudWorx
//                 </h1>
//                 <p className="text-sm text-blue-500 font-medium">University</p>
//               </div>
//             </div>

//             <nav className="hidden md:flex items-center space-x-8">
//               <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors">Features</a>
//               <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors">Pricing</a>
//               <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors">Resources</a>
//               <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors">Signup</a>
//               <div className="eclw-gradient-blue text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
//                 eCloudWorx University
//               </div>
//             </nav>

//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search Knowledge Base..."
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   className="w-72 pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white/50 backdrop-blur-sm eclw-search-focus"
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//           {/* Enhanced Sidebar */}
//           <aside className="lg:col-span-3 space-y-6">
//             {/* Browse Topics */}
//             <div className="eclw-gradient-card rounded-xl border border-gray-200 p-6 eclw-fade-up eclw-stagger-1">
//               <h3 className="font-bold text-gray-900 mb-6 text-lg">Browse Topics</h3>

//               <div className="space-y-3">
//                 <button
//                   onClick={() => handleCategoryClick(null)}
//                   className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-medium ${
//                     !activeCategory 
//                       ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg' 
//                       : 'text-gray-600 hover:bg-gray-50 eclw-hover-scale'
//                   }`}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
//                       <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                       </svg>
//                     </div>
//                     <span>Getting Started</span>
//                   </div>
//                   <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-bold">
//                     {articles.length}
//                   </span>
//                 </button>

//                 {categories.map((cat, index) => {
//                   const count = articles.filter(a => {
//                     const tech = (a.Technology || "").toLowerCase();
//                     const catLower = (cat.name || "").toLowerCase();
//                     return tech.includes(catLower);
//                   }).length;

//                   const gradients = [
//                     "from-orange-500 to-red-500",
//                     "from-blue-500 to-indigo-600", 
//                     "from-yellow-500 to-orange-500",
//                     "from-green-500 to-emerald-600",
//                     "from-purple-500 to-pink-600"
//                   ];

//                   const icons = [
//                     "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
//                     "M19 11H5m14-7v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v7zM9 7h6",
//                     "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
//                     "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
//                     "M13 10V3L4 14h7v7l9-11h-7z"
//                   ];

//                   const gradient = gradients[index % gradients.length];
//                   const icon = icons[index % icons.length];

//                   return (
//                     <button
//                       key={cat.id}
//                       onClick={() => handleCategoryClick(cat)}
//                       className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-medium eclw-hover-scale ${
//                         activeCategory && activeCategory.id === cat.id
//                           ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
//                           : 'text-gray-600 hover:bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-center space-x-3">
//                         <div className={`w-8 h-8 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center`}>
//                           <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
//                           </svg>
//                         </div>
//                         <span>{cat.name}</span>
//                       </div>
//                       <span className="text-xs bg-gray-100 px-2 py-1 rounded-full font-bold">
//                         {count}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Popular This Week */}
//             <div className="bg-white rounded-xl border border-gray-200 p-6 eclw-fade-up eclw-stagger-2 eclw-hover-lift">
//               <h3 className="font-bold text-gray-900 mb-6 text-lg">Popular This Week</h3>
//               <div className="space-y-4">
//                 {featured.slice(0, 3).map((article, index) => (
//                   <div key={article.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => openReaderForSlug(article.Slug)}>
//                     <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
//                       <span className="text-xs font-bold text-white">{index + 1}</span>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h4 className="text-sm font-semibold text-gray-900 hover:text-blue-600 line-clamp-2 mb-1">
//                         {article.Title || "Introduction to AWS IAM"}
//                       </h4>
//                       <p className="text-xs text-gray-500">
//                         {Math.floor(Math.random() * 500) + 100} views • {Math.ceil(Math.random() * 20) + 5} min read
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Knowledge Base Stats */}
//             <div className="eclw-fade-up eclw-stagger-3">
//               <KnowledgeBaseStats articles={articles} />
//             </div>

//             {/* Quick Start Guide */}
//             <div className="eclw-fade-up eclw-stagger-4">
//               <QuickStartGuide />
//             </div>

//             {/* Recent Updates */}
//             <div className="eclw-fade-up eclw-stagger-4">
//               <RecentUpdates />
//             </div>
//           </aside>

//           {/* Enhanced Main Content */}
//           <main className="lg:col-span-9 space-y-8">
//             {/* Featured Article Hero */}
//             <div className="eclw-fade-up">
//               <div className="flex items-center mb-6">
//                 <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
//                 <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
//                   Curated content to get you started
//                 </span>
//               </div>
//               <FeaturedHeroCard article={featured[0] || {}} onRead={openReaderForSlug} />
//             </div>
                
//             {/* Knowledge Base Articles */}
//             <div className="eclw-fade-up eclw-stagger-2">
//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center space-x-4">
//                   <h2 className="text-2xl font-bold text-gray-900">Knowledge Base Articles</h2>
//                   <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
//                     {filteredArticles.length} articles
//                   </span>
//                 </div>
//                 {(activeCategory || query) && (
//                   <button
//                     onClick={clearFilters}
//                     className="text-sm text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
//                   >
//                     Clear Filters
//                   </button>
//                 )}
//               </div>

//               {/* Enhanced Filter Tags */}
//               {(activeCategory || query) && (
//                 <div className="flex items-center space-x-3 mb-8 eclw-fade-in">
//                   <span className="text-sm text-gray-600 font-medium">Filtered by:</span>
//                   {activeCategory && (
//                     <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium">
//                       {activeCategory.name}
//                       <button
//                         onClick={() => setActiveCategory(null)}
//                         className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-blue-200 hover:bg-white/20 hover:text-white transition-colors"
//                       >
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     </span>
//                   )}
//                   {query && (
//                     <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-200 text-gray-800 text-sm font-medium">
//                       "{query}"
//                       <button
//                         onClick={() => setQuery("")}
//                         className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-gray-400 hover:bg-gray-300 hover:text-gray-600 transition-colors"
//                       >
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Enhanced Articles Grid */}
//             {loading ? (
//               <LoadingSpinner />
//             ) : error ? (
//               <ErrorMessage message={error} onRetry={fetchAllArticles} />
//             ) : filteredArticles.length === 0 ? (
//               <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 eclw-scale-in">
//                 <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
//                 <p className="text-gray-500 mb-6 max-w-md mx-auto">We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.</p>
//                 <button
//                   onClick={clearFilters}
//                   className="eclw-btn-primary text-white px-6 py-3 rounded-lg font-semibold"
//                 >
//                   Clear all filters
//                 </button>
//               </div>
//             ) : (
//               <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
//                 {filteredArticles.map((article, index) => (
//                   <KnowledgeBaseCard
//                     key={article.id}
//                     article={article}
//                     onRead={openReaderForSlug}
//                     index={index}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Enhanced Learning Paths */}
//             <div className="eclw-fade-up eclw-stagger-3">
//               <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-8">
//                 <div className="flex items-center mb-8">
//                   <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
//                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v7zM9 7h6" />
//                     </svg>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900">Learning Paths</h3>
//                 </div>
//                 <div className="grid gap-6 md:grid-cols-3">
//                   {[
//                     {
//                       title: "Cloud Fundamentals",
//                       description: "Start with the basics of cloud computing",
//                       color: "from-indigo-500 to-blue-600",
//                       step: "1"
//                     },
//                     {
//                       title: "Multi-Cloud Strategy", 
//                       description: "Learn to manage multiple cloud providers",
//                       color: "from-blue-500 to-cyan-600",
//                       step: "2"
//                     },
//                     {
//                       title: "Advanced DevOps",
//                       description: "Master advanced automation and CI/CD", 
//                       color: "from-green-500 to-emerald-600",
//                       step: "3"
//                     }
//                   ].map((path, index) => (
//                     <div key={index} className="eclw-hover-lift eclw-gradient-card rounded-xl p-6 cursor-pointer">
//                       <div className="flex items-start space-x-4">
//                         <div className={`w-10 h-10 bg-gradient-to-br ${path.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
//                           <span className="text-sm font-bold text-white">{path.step}</span>
//                         </div>
//                         <div>
//                           <h4 className="font-bold text-gray-900 mb-2">{path.title}</h4>
//                           <p className="text-sm text-gray-600 mb-4">{path.description}</p>
//                           <div className="flex items-center text-sm text-blue-600 font-semibold">
//                             Start Learning 
//                             <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>

//       {/* Enhanced Reader Modal */}
//       {readerOpen && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 eclw-fade-in" onClick={overlayClick}>
//           <div className="eclw-modal bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
//             {/* Enhanced Modal Header */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-900">Article Reader</h2>
//               </div>
//               <button
//                 onClick={closeReader}
//                 className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all eclw-hover-scale"
//               >
//                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Enhanced Modal Content */}
//             <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
//               {readerLoading ? (
//                 <div className="p-12">
//                   <LoadingSpinner />
//                 </div>
//               ) : readerError ? (
//                 <div className="p-6">
//                   <ErrorMessage message={readerError} />
//                 </div>
//               ) : currentArticle ? (
//                 <div className="p-8">
//                   <div className="mb-8">
//                     {currentArticle.Technology && (
//                       <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white mb-6">
//                         {currentArticle.Technology}
//                       </span>
//                     )}
//                     <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
//                       {currentArticle.Title || "Untitled Article"}
//                     </h1>
//                     <div className="flex items-center text-sm text-gray-500 mb-8 space-x-6">
//                       <div className="flex items-center space-x-2">
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                         </svg>
//                         <span className="font-medium">{formatDate(currentArticle.PublishedDate)}</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
//                           <span className="text-white text-xs font-bold">eC</span>
//                         </div>
//                         <span className="font-medium">Team eCloudWorx</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-code:text-pink-600 prose-code:bg-pink-50">
//                     {currentArticle.Content ? (
//                       <div dangerouslySetInnerHTML={{ __html: processContentForDisplay(currentArticle.Content) }} />
//                     ) : (
//                       <div className="text-center py-12 bg-gray-50 rounded-xl">
//                         <p className="text-gray-600 italic">No content available for this article.</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       )}
    
//       {/* eCloudWorx Footer */}
//       <footer className="bg-white border-t border-gray-200 mt-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Brand */}
//           <div>
//             <h3 className="text-lg font-bold text-gray-900">eCloudWorx</h3>
//             <p className="mt-2 text-sm text-gray-600">
//               Your cloud, simplified. Reach us at{" "}
//               <a
//                 href="mailto:hi@ecloudworx.com"
//                 className="text-blue-600 hover:underline"
//               >
//                 hi@ecloudworx.com
//               </a>
//             </p>
//           </div>

//           {/* Product */}
//           <div>
//             <h4 className="text-sm font-semibold text-gray-900 mb-4">Product</h4>
//             <ul className="space-y-2 text-sm text-gray-600">
//               <li><a href="#" className="hover:text-blue-600">Features</a></li>
//               <li><a href="#" className="hover:text-blue-600">Automation Library</a></li>
//               <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
//               <li><a href="#" className="hover:text-blue-600">API Docs</a></li>
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
//             <ul className="space-y-2 text-sm text-gray-600">
//               <li><a href="#" className="hover:text-blue-600">About Us</a></li>
//               <li><a href="#" className="hover:text-blue-600">Blog</a></li>
//               <li><a href="#" className="hover:text-blue-600">Careers</a></li>
//               <li><a href="#" className="hover:text-blue-600">Contact</a></li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
//             <ul className="space-y-2 text-sm text-gray-600">
//               <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
//               <li><a href="#" className="hover:text-blue-600">Community</a></li>
//               <li><a href="#" className="hover:text-blue-600">Status</a></li>
//               <li><a href="#" className="hover:text-blue-600">Security</a></li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
//           © {new Date().getFullYear()} eCloudWorx. All rights reserved.
//         </div>
//       </footer>

// </div>
//   );
// }

import React, { useEffect, useState, useCallback } from "react";

/* Enhanced animations CSS injection */
const __eclw_enhanced_styles = `
@keyframes eclw-fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes eclw-fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes eclw-slideDown {
  from { opacity: 0; transform: translateY(-20px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes eclw-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@keyframes eclw-scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes eclw-shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.eclw-fade-up { 
  animation: eclw-fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; 
}

.eclw-fade-in { 
  animation: eclw-fadeIn 0.4s ease-out both; 
}

.eclw-modal { 
  animation: eclw-slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; 
}

.eclw-scale-in { 
  animation: eclw-scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; 
}

.eclw-stagger-1 { animation-delay: 0.1s; }
.eclw-stagger-2 { animation-delay: 0.2s; }
.eclw-stagger-3 { animation-delay: 0.3s; }
.eclw-stagger-4 { animation-delay: 0.4s; }

/* Enhanced hover effects */
.eclw-hover-lift {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.eclw-hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.eclw-hover-scale {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.eclw-hover-scale:hover {
  transform: scale(1.02);
}

/* Modern gradient backgrounds */
.eclw-gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.eclw-gradient-blue {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}

.eclw-gradient-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%);
  backdrop-filter: blur(10px);
}

/* Loading shimmer effect */
.eclw-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: eclw-shimmer 1.4s ease-in-out infinite;
}

/* Modern button styles */
.eclw-btn-primary {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.eclw-btn-primary:hover {
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
  transform: translateY(-1px);
}

/* Enhanced search input */
.eclw-search-focus {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.eclw-search-focus:focus {
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1), 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

@media (prefers-reduced-motion: reduce) {
  .eclw-fade-up,
  .eclw-fade-in,
  .eclw-modal,
  .eclw-scale-in,
  .eclw-hover-lift,
  .eclw-hover-scale {
    animation: none !important;
    transition: none !important;
  }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('eclw-enhanced-animations-style')) {
  const s = document.createElement('style');
  s.id = 'eclw-enhanced-animations-style';
  s.innerHTML = __eclw_enhanced_styles;
  document.head.appendChild(s);
}

const STRAPI = import.meta.env.VITE_STRAPI_URL || "/api";
const LOGO_PATH = "/university.png";

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return iso;
  }
}

// Enhanced Loading Spinner
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16 eclw-fade-in">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="ml-4 text-gray-600 font-medium">Loading articles...</p>
    </div>
  );
}

// Enhanced Error Component
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-8 text-center eclw-scale-in">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
      <p className="text-red-600 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="eclw-btn-primary text-white px-6 py-3 rounded-lg font-semibold"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Enhanced Article Card
function KnowledgeBaseCard({ article, onRead, showStats = true, index = 0 }) {
  const readTime = Math.ceil((article.ContentLength || article.Content?.length || 1000) / 200) || 15;
  const views = Math.floor(Math.random() * 5000) + 1000;

  return (
    <div className={`eclw-hover-lift eclw-gradient-card rounded-xl border border-gray-200 overflow-hidden group eclw-fade-up eclw-stagger-${(index % 4) + 1}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              {article.Technology && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  {article.Technology}
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                {article.Technology === 'AWS Management' ? 'aws' : 
                 article.Technology === 'Azure Integration' ? 'azure' : 
                 article.Technology === 'Google Cloud' ? 'gcp' : 'cloud'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
              {article.Title || "Untitled Article"}
            </h3>
          </div>
          <div className="flex items-center ml-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
          {article.Summary || (article.Content ? String(article.Content).slice(0, 160) + '...' : 'Learn how to efficiently manage resources across multiple cloud platforms using eCloudWorx unified dashboard. This comprehensive guide covers...')}
        </p>

        {showStats && (
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{readTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-medium">{views.toLocaleString()} views</span>
              </div>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{formatDate(article.PublishedDate)}</span>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">eC</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Team eCloudWorx</span>
            </div>
            <button
              onClick={() => onRead(article.Slug)}
              className="eclw-btn-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
            >
              Read Article →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Featured Hero Card
function FeaturedHeroCard({ article, onRead }) {
  const readTime = Math.ceil((article.ContentLength || article.Content?.length || 1000) / 200) || 15;
  const views = Math.floor(Math.random() * 5000) + 2000;

  return (
    <div className="eclw-gradient-bg rounded-2xl border border-indigo-200 p-8 relative overflow-hidden text-white eclw-fade-up">
      <div className="absolute top-6 right-6">
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-white text-indigo-600 shadow-lg">
          ⭐ FEATURED
        </span>
      </div>

      <div className="max-w-4xl relative z-10">
        <div className="mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white/90 mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Latest Article
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            {article.Title || "Introduction to DevOps and CI/CD Pipeline Management"}
          </h2>
        </div>

        <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-3xl">
          {article.Summary || "TL;DR DevOps integrates development and operations to speed up software delivery using automated CI/CD pipelines. Learn best practices for automation, version control, and security scanning."}
        </p>

        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-indigo-600">
            multi-cloud
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
            aws
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
            devops
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
            cicd
          </span>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-6 text-sm text-white/80">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{readTime} min read</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-medium">{views.toLocaleString()} views</span>
            </div>
            <span className="font-medium">{formatDate(article.PublishedDate)}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-indigo-600 text-xs font-bold">eC</span>
              </div>
              <span className="text-sm font-medium">Team eCloudWorx</span>
            </div>
            <button
              onClick={() => onRead(article.Slug)}
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all hover:shadow-lg"
            >
              Read Article
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
    </div>
  );
}

// Enhanced Stats Component
function KnowledgeBaseStats({ articles }) {
  const totalViews = articles.length * 1500;

  return (
    <div className="eclw-gradient-blue rounded-xl p-6 text-white eclw-hover-scale">
      <div className="text-center">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-6">Knowledge Base Stats</h3>
        <div className="space-y-4">
          <div>
            <div className="text-3xl font-bold">{articles.length}</div>
            <div className="text-indigo-200 text-sm">Total Articles</div>
          </div>
          <div className="border-t border-white/20 pt-4">
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <div className="text-indigo-200 text-sm">Total Views</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Quick Start Guide
function QuickStartGuide() {
  const [completed, setCompleted] = useState([false, false, false]);

  const toggleStep = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 eclw-hover-lift">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="font-bold text-green-800 text-lg">Quick Start</h3>
      </div>
      <div className="space-y-4">
        {[
          "Set up your account",
          "Configure cloud providers", 
          "Deploy your first resource"
        ].map((step, index) => (
          <div key={index} className="flex items-center space-x-3 group cursor-pointer" onClick={() => toggleStep(index)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              completed[index] 
                ? 'bg-green-500 text-white' 
                : 'bg-green-100 text-green-600 group-hover:bg-green-200'
            }`}>
              {completed[index] ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-xs font-bold">{index + 1}</span>
              )}
            </div>
            <span className={`text-sm transition-all ${
              completed[index] ? 'text-green-600 line-through' : 'text-green-700 group-hover:text-green-800'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg text-sm font-bold hover:shadow-lg transition-all">
        Get Started
      </button>
    </div>
  );
}

// Enhanced Recent Updates
function RecentUpdates() {
  const updates = [
    { title: "New Azure Integration Features", date: "Sep 8, 2025", type: "feature" },
    { title: "Security Best Practices Updated", date: "Sep 7, 2025", type: "update" },
    { title: "GCP Cost Optimization Guide", date: "Sep 6, 2025", type: "guide" },
    { title: "Multi-Cloud Deployment Tutorial", date: "Sep 5, 2025", type: "tutorial" }
  ];

  const typeColors = {
    feature: "from-blue-500 to-indigo-600",
    update: "from-orange-500 to-red-500", 
    guide: "from-green-500 to-emerald-600",
    tutorial: "from-purple-500 to-pink-600"
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 eclw-hover-lift">
      <h3 className="font-bold text-gray-900 mb-6 flex items-center text-lg">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        Recent Updates
      </h3>
      <div className="space-y-4">
        {updates.map((update, index) => (
          <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex-shrink-0 mt-1">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${typeColors[update.type]}`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-1">{update.title}</p>
              <p className="text-xs text-gray-500">{update.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UniversityLanding() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
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

  // Animation state
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // All your existing useEffect hooks and functions remain the same...
  // [Previous useEffect and function implementations stay unchanged]

  // Fetch categories
  useEffect(() => {
    (async function fetchCategories() {
      try {
        const res = await fetch(`${STRAPI}/categories`);
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
      const res = await fetch(`${STRAPI}/kb-articles?populate=*`);
      if (!res.ok) throw new Error(`Articles fetch failed: ${res.status}`);
      const json = await res.json();
      const raw = json.data || json || [];
      const mapped = raw.map((article) => {
        // Extract title from Title block (rich text)
        const titleText = article.Title?.[0]?.children?.[0]?.text || "Untitled Article";

        // Extract categories for Technology field
        const technology = article.categories?.[0]?.name || "";

        // Generate summary from content blocks
        let summary = "";
        if (article.content && Array.isArray(article.content)) {
          for (const block of article.content) {
            if (block.__component === "shared.text-block" && block.body) {
              // Extract text from rich text body
              const textContent = block.body
                .map(p => p.children?.map(c => c.text).join('') || '')
                .join(' ')
                .replace(/#+/g, '') // Remove markdown headers
                .trim();
              if (textContent && textContent.length > 10) {
                summary = textContent.slice(0, 200) + "...";
                break;
              }
            }
            if (block.__component === "shared.section-block" && block.section) {
              // Extract text from section block
              const sectionText = block.section
                .map(p => p.children?.map(c => c.text).join('') || '')
                .join(' ')
                .replace(/<[^>]*>/g, '') // Remove HTML tags
                .replace(/#+/g, '') // Remove markdown headers
                .trim();
              if (sectionText && sectionText.length > 10) {
                summary = sectionText.slice(0, 200) + "...";
                break;
              }
            }
          }
        }

        // Generate content preview for reading time calculation
        let contentLength = 0;
        if (article.content && Array.isArray(article.content)) {
          article.content.forEach(block => {
            if (block.__component === "shared.text-block" && block.body) {
              contentLength += block.body.map(p => p.children?.map(c => c.text).join('') || '').join(' ').length;
            }
            if (block.__component === "shared.section-block" && block.section) {
              contentLength += block.section.map(p => p.children?.map(c => c.text).join('') || '').join(' ').length;
            }
            if (block.__component === "shared.code-block" && block.code) {
              contentLength += block.code.length;
            }
          });
        }

        return {
          id: article.id,
          documentId: article.documentId,
          Title: titleText,
          Slug: article.documentId, // Using documentId as slug since no explicit slug field
          Summary: summary || "Explore this comprehensive guide covering cloud architecture best practices and implementation strategies.",
          Content: article.content || [],
          ContentLength: contentLength,
          Technology: technology,
          PublishedDate: article.publishedAt || article.createdAt,
          Published: article.publishedAt ? true : false,
          Categories: article.categories || [],
          Authors: article.authors || [],
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

  // All other existing functions remain the same...
  // [All existing functions like filtering logic, modal functions, etc.]

  // Filtering logic
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

  // Reader modal functions
  const openReaderForSlug = useCallback(async (slug) => {
    if (!slug) return;
    setReaderOpen(true);
    setReaderLoading(true);
    setReaderError(null);
    setCurrentArticle(null);

    try {
      const res = await fetch(`${STRAPI}/kb-articles?filters[documentId][$eq]=${encodeURIComponent(slug)}&populate=*`);
      if (!res.ok) throw new Error(`Article fetch failed: ${res.status}`);
      const json = await res.json();
      const raw = (json.data && json.data[0]) ? json.data[0] : (json[0] || null);
      if (!raw) throw new Error("Article not found");

      // Extract title from Title block (rich text)
      const titleText = raw.Title?.[0]?.children?.[0]?.text || "Untitled Article";

      // Extract categories for Technology field
      const technology = raw.categories?.[0]?.name || "";

      const mapped = {
        id: raw.id,
        documentId: raw.documentId,
        Title: titleText,
        Slug: raw.documentId,
        Content: raw.content || [],
        Summary: raw.Summary || "",
        Technology: technology,
        PublishedDate: raw.publishedAt || raw.createdAt,
        Authors: raw.authors || [],
        Categories: raw.categories || [],
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
    function onKey(e) {
      if (e.key === "Escape") closeReader();
    }
    if (readerOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [readerOpen, closeReader]);

  function overlayClick(e) {
    if (e.target === e.currentTarget) closeReader();
  }

  const processContentForDisplay = (content) => {
    if (!content || !Array.isArray(content)) return "";

    let html = '';

    content.forEach((block, index) => {
      switch (block.__component) {
        case 'shared.text-block':
          if (block.body && Array.isArray(block.body)) {
            block.body.forEach(paragraph => {
              if (paragraph.children) {
                const text = paragraph.children.map(child => child.text || '').join('');
                if (text.trim()) {
                  // Check if it's a header (starts with # characters)
                  if (text.startsWith('#')) {
                    const headerLevel = (text.match(/^#+/) || [''])[0].length;
                    const headerText = text.replace(/^#+\s*/, '');
                    html += `<h${Math.min(headerLevel, 6)} class="text-${4-Math.min(headerLevel-1, 2)}xl font-bold text-gray-900 mt-8 mb-4">${headerText}</h${Math.min(headerLevel, 6)}>`;
                  } else {
                    html += `<p class="mb-4 text-gray-700 leading-relaxed">${text}</p>`;
                  }
                }
              }
            });
          }
          break;

        case 'shared.section-block':
          if (block.section && Array.isArray(block.section)) {
            block.section.forEach(paragraph => {
              if (paragraph.children) {
                const text = paragraph.children.map(child => child.text || '').join('');
                if (text.trim()) {
                  // Remove HTML tags and convert to proper formatting
                  const cleanText = text
                    .replace(/<h2>/g, '').replace(/<\/h2>/g, '')
                    .replace(/<p>/g, '').replace(/<\/p>/g, '')
                    .replace(/<ul>/g, '').replace(/<\/ul>/g, '')
                    .replace(/<li>/g, '• ').replace(/<\/li>/g, '')
                    .replace(/&lt;/g, '<').replace(/&gt;/g, '>');

                  if (cleanText.startsWith('## ')) {
                    const headerText = cleanText.replace(/^## /, '');
                    html += `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${headerText}</h2>`;
                  } else if (cleanText.startsWith('• ')) {
                    html += `<li class="ml-4 mb-2 text-gray-700">${cleanText.replace(/^• /, '')}</li>`;
                  } else if (cleanText.trim()) {
                    html += `<p class="mb-4 text-gray-700 leading-relaxed">${cleanText}</p>`;
                  }
                }
              }
            });
          }
          break;

        case 'shared.code-block':
          if (block.code) {
            const language = block.language || 'bash';
            // FIXED: Clean HTML tags from code content and handle syntax highlighting properly
            let cleanCode = block.code
              .replace(/<h3>.*?<\/h3>/gi, '')  // Remove h3 tags
              .replace(/<pre><code>/gi, '')     // Remove pre/code opening tags
              .replace(/<\/code><\/pre>/gi, '') // Remove pre/code closing tags
              .replace(/<[^>]*>/g, '')          // Remove any remaining HTML tags
              .replace(/&lt;/g, '<')            // Decode HTML entities
              .replace(/&gt;/g, '>')
              .replace(/&amp;/g, '&')
              .trim();

            html += `
              <div class="my-6">
                ${block.caption ? `<p class="text-sm text-gray-600 mb-3 font-medium">${block.caption}</p>` : ''}
                <div class="bg-gray-900 rounded-lg overflow-hidden">
                  <div class="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                    <span class="text-xs text-gray-400 font-mono">${language}</span>
                    <button 
                      onclick="navigator.clipboard.writeText(\`${cleanCode.replace(/\`/g, '\\`')}\`)"
                      class="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700"
                      title="Copy code"
                    >
                      Copy
                    </button>
                  </div>
                  <pre class="p-4 overflow-x-auto text-sm"><code class="language-${language} text-gray-100">${cleanCode}</code></pre>
                </div>
              </div>
            `;
          }
          break;

        case 'shared.callout-block':
          if (block.message && Array.isArray(block.message)) {
            const messageText = block.message
              .map(p => p.children?.map(c => c.text).join('') || '')
              .join(' ');
            const style = block.style || 'info';
            const bgColor = style === 'warning' ? 'bg-yellow-50 border-yellow-200' : 
                           style === 'error' ? 'bg-red-50 border-red-200' :
                           'bg-blue-50 border-blue-200';
            html += `
              <div class="my-6 p-4 ${bgColor} border rounded-lg">
                <p class="text-gray-700">${messageText}</p>
              </div>
            `;
          }
          break;

        case 'shared.video-block':
          if (block.url) {
            html += `
              <div class="my-6">
                ${block.caption ? `<p class="text-sm text-gray-600 mb-2">${block.caption}</p>` : ''}
                <div class="aspect-video">
                  <iframe 
                    src="${block.url.replace('watch?v=', 'embed/')}" 
                    class="w-full h-full rounded-lg"
                    frameborder="0" 
                    allowfullscreen>
                  </iframe>
                </div>
              </div>
            `;
          }
          break;

        case 'shared.image-block':
          // FIXED: Handle both old structure (block.image.url) and new structure (block.url)
          const imageUrl = block.url || (block.image && block.image.url);

          if (imageUrl) {
            const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : STRAPI + imageUrl;
            html += `
              <div class="my-6">
                <img 
                  src="${fullImageUrl}" 
                  alt="${block.alt || (block.image && block.image.alternativeText) || 'Article image'}"
                  class="w-full h-auto rounded-lg shadow-md"
                  onError="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjAgMTUwTDE2MCAyMDBMMjQwIDEyMEwyODAgMTgwSDE2MFoiIGZpbGw9IiNEMUQ1REIiLz4KPGNpcmNsZSBjeD0iMTQwIiBjeT0iMTEwIiByPSIyMCIgZmlsbD0iI0QxRDVEQiIvPgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOUI5Q0E0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPgo='; this.parentElement.classList.add('bg-gray-50', 'flex', 'items-center', 'justify-center', 'min-h-48');"
                />
                ${block.caption ? `<p class="text-sm text-gray-600 italic text-center mt-2">${block.caption}</p>` : ''}
              </div>
            `;
          } else if (block.alt || block.caption) {
            // Fallback for when image data is not available
            html += `
              <div class="my-6 text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div class="text-gray-400 mb-3">
                  <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                ${block.caption ? `<p class="text-sm text-gray-600 italic font-medium">${block.caption}</p>` : ''}
                ${block.alt ? `<p class="text-xs text-gray-500 mt-1">${block.alt}</p>` : ''}
              </div>
            `;
          }
          break;

        default:
          // Handle any other block types
          console.log('Unknown block type:', block.__component);
          break;
      }
    });

    return html;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 ${isVisible ? 'eclw-fade-in' : 'opacity-0'}`}>
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40 eclw-fade-up">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img 
                src={LOGO_PATH} 
                alt="eCloudWorx University" 
                className="h-10 w-auto object-contain eclw-hover-scale"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  eCloudWorx
                </h1>
                <p className="text-sm text-blue-500 font-medium">University</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors">Resources</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors">Signup</a>
              <div className="eclw-gradient-blue text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                eCloudWorx University
              </div>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Knowledge Base..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-72 pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white/50 backdrop-blur-sm eclw-search-focus"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Enhanced Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Browse Topics */}
            <div className="eclw-gradient-card rounded-xl border border-gray-200 p-6 eclw-fade-up eclw-stagger-1">
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Browse Topics</h3>

              <div className="space-y-3">
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                    !activeCategory 
                      ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-50 eclw-hover-scale'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span>Getting Started</span>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-bold">
                    {articles.length}
                  </span>
                </button>

                {categories.map((cat, index) => {
                  const count = articles.filter(a => {
                    const tech = (a.Technology || "").toLowerCase();
                    const catLower = (cat.name || "").toLowerCase();
                    return tech.includes(catLower);
                  }).length;

                  const gradients = [
                    "from-orange-500 to-red-500",
                    "from-blue-500 to-indigo-600", 
                    "from-yellow-500 to-orange-500",
                    "from-green-500 to-emerald-600",
                    "from-purple-500 to-pink-600"
                  ];

                  const icons = [
                    "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
                    "M19 11H5m14-7v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v7zM9 7h6",
                    "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                    "M13 10V3L4 14h7v7l9-11h-7z"
                  ];

                  const gradient = gradients[index % gradients.length];
                  const icon = icons[index % icons.length];

                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat)}
                      className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-medium eclw-hover-scale ${
                        activeCategory && activeCategory.id === cat.id
                          ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center`}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                          </svg>
                        </div>
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full font-bold">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular This Week */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 eclw-fade-up eclw-stagger-2 eclw-hover-lift">
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Popular This Week</h3>
              <div className="space-y-4">
                {featured.slice(0, 3).map((article, index) => (
                  <div key={article.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => openReaderForSlug(article.Slug)}>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 hover:text-blue-600 line-clamp-2 mb-1">
                        {article.Title || "Introduction to AWS IAM"}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {Math.floor(Math.random() * 500) + 100} views • {Math.ceil(Math.random() * 20) + 5} min read
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Base Stats */}
            <div className="eclw-fade-up eclw-stagger-3">
              <KnowledgeBaseStats articles={articles} />
            </div>

            {/* Quick Start Guide */}
            <div className="eclw-fade-up eclw-stagger-4">
              <QuickStartGuide />
            </div>

            {/* Recent Updates */}
            <div className="eclw-fade-up eclw-stagger-4">
              <RecentUpdates />
            </div>
          </aside>

          {/* Enhanced Main Content */}
          <main className="lg:col-span-9 space-y-8">
            {/* Featured Article Hero */}
            <div className="eclw-fade-up">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
                <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                  Curated content to get you started
                </span>
              </div>
              <FeaturedHeroCard article={featured[0] || {}} onRead={openReaderForSlug} />
            </div>
                
            {/* Knowledge Base Articles */}
            <div className="eclw-fade-up eclw-stagger-2">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-gray-900">Knowledge Base Articles</h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    {filteredArticles.length} articles
                  </span>
                </div>
                {(activeCategory || query) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Enhanced Filter Tags */}
              {(activeCategory || query) && (
                <div className="flex items-center space-x-3 mb-8 eclw-fade-in">
                  <span className="text-sm text-gray-600 font-medium">Filtered by:</span>
                  {activeCategory && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium">
                      {activeCategory.name}
                      <button
                        onClick={() => setActiveCategory(null)}
                        className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-blue-200 hover:bg-white/20 hover:text-white transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {query && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-200 text-gray-800 text-sm font-medium">
                      "{query}"
                      <button
                        onClick={() => setQuery("")}
                        className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-gray-400 hover:bg-gray-300 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Enhanced Articles Grid */}
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} onRetry={fetchAllArticles} />
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 eclw-scale-in">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.</p>
                <button
                  onClick={clearFilters}
                  className="eclw-btn-primary text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredArticles.map((article, index) => (
                  <KnowledgeBaseCard
                    key={article.id}
                    article={article}
                    onRead={openReaderForSlug}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* Enhanced Learning Paths */}
            <div className="eclw-fade-up eclw-stagger-3">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-8">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v7zM9 7h6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Learning Paths</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      title: "Cloud Fundamentals",
                      description: "Start with the basics of cloud computing",
                      color: "from-indigo-500 to-blue-600",
                      step: "1"
                    },
                    {
                      title: "Multi-Cloud Strategy", 
                      description: "Learn to manage multiple cloud providers",
                      color: "from-blue-500 to-cyan-600",
                      step: "2"
                    },
                    {
                      title: "Advanced DevOps",
                      description: "Master advanced automation and CI/CD", 
                      color: "from-green-500 to-emerald-600",
                      step: "3"
                    }
                  ].map((path, index) => (
                    <div key={index} className="eclw-hover-lift eclw-gradient-card rounded-xl p-6 cursor-pointer">
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 bg-gradient-to-br ${path.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <span className="text-sm font-bold text-white">{path.step}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">{path.title}</h4>
                          <p className="text-sm text-gray-600 mb-4">{path.description}</p>
                          <div className="flex items-center text-sm text-blue-600 font-semibold">
                            Start Learning 
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Enhanced Reader Modal */}
      {readerOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 eclw-fade-in" onClick={overlayClick}>
          <div className="eclw-modal bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
            {/* Enhanced Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Article Reader</h2>
              </div>
              <button
                onClick={closeReader}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all eclw-hover-scale"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Enhanced Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {readerLoading ? (
                <div className="p-12">
                  <LoadingSpinner />
                </div>
              ) : readerError ? (
                <div className="p-6">
                  <ErrorMessage message={readerError} />
                </div>
              ) : currentArticle ? (
                <div className="p-8">
                  <div className="mb-8">
                    {currentArticle.Technology && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white mb-6">
                        {currentArticle.Technology}
                      </span>
                    )}
                    <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                      {currentArticle.Title || "Untitled Article"}
                    </h1>
                    <div className="flex items-center text-sm text-gray-500 mb-8 space-x-6">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{formatDate(currentArticle.PublishedDate)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">eC</span>
                        </div>
                        <span className="font-medium">Team eCloudWorx</span>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-code:text-pink-600 prose-code:bg-pink-50">
                    {currentArticle.Content ? (
                      <div dangerouslySetInnerHTML={{ __html: processContentForDisplay(currentArticle.Content) }} />
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <p className="text-gray-600 italic">No content available for this article.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    
      {/* eCloudWorx Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-gray-900">eCloudWorx</h3>
            <p className="mt-2 text-sm text-gray-600">
              Your cloud, simplified. Reach us at{" "}
              <a
                href="mailto:hi@ecloudworx.com"
                className="text-blue-600 hover:underline"
              >
                hi@ecloudworx.com
              </a>
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Features</a></li>
              <li><a href="#" className="hover:text-blue-600">Automation Library</a></li>
              <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-600">API Docs</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600">Community</a></li>
              <li><a href="#" className="hover:text-blue-600">Status</a></li>
              <li><a href="#" className="hover:text-blue-600">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} eCloudWorx. All rights reserved.
        </div>
      </footer>

</div>
  );
}

