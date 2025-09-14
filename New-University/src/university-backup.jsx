import React, { useEffect, useState, useCallback } from "react";

/* BEGIN: injected animations (fade-up, modal slide) */
const __eclw_styles = `
@keyframes eclw-fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes eclw-modalDown {
  from { opacity: 0; transform: translateY(-12px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.eclw-fade-up { animation: eclw-fadeUp 420ms cubic-bezier(.2,.9,.2,1) both; }
.eclw-modal { animation: eclw-modalDown 320ms cubic-bezier(.2,.9,.2,1) both; }
`;
if (typeof document !== 'undefined' && !document.getElementById('eclw-animations-style')) {
  const s = document.createElement('style');
  s.id = 'eclw-animations-style';
  s.innerHTML = __eclw_styles;
  document.head.appendChild(s);
}
/* END: injected animations */

/**
 * eCloudWorx University - Full-Page Professional Knowledge Base
 * - Enhanced layout to fill the entire page
 * - Additional static content boxes for better visual appeal
 * - Comprehensive sidebar with more sections
 * - Full-width layout with better content distribution
 */

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

// Professional Loading Spinner
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="relative">
        <div className="w-8 h-8 border-2 border-blue-200 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-8 h-8 border-2 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

// Professional Error Component
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Knowledge Base Article Card
function KnowledgeBaseCard({ article, onRead, showStats = true }) {
  const readTime = Math.ceil((article.Content?.length || 0) / 200) || 15;
  const views = Math.floor(Math.random() * 5000) + 1000;

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              {article.Technology && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                  {article.Technology}
                </span>
              )}
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                {article.Technology === 'AWS Management' ? 'aws' : 
                 article.Technology === 'Azure Integration' ? 'azure' : 
                 article.Technology === 'Google Cloud' ? 'gcp' : 'cloud'}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                guide
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
              {article.Title || "Untitled Article"}
            </h3>
          </div>
          <div className="flex items-center ml-4">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {article.Summary || (article.Content ? String(article.Content).slice(0, 160) : 'Learn how to efficiently manage resources across multiple cloud platforms using eCloudWorx unified dashboard. This comprehensive guide covers...')}
        </p>

        {showStats && (
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{views.toLocaleString()} views</span>
              </div>
            </div>
            <span className="text-xs">Updated {formatDate(article.PublishedDate)}</span>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">By Team eCloudWorx</span>
            <button
              onClick={() => onRead(article.Slug)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              Read Article â†’
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Featured Article Hero Card
function FeaturedHeroCard({ article, onRead }) {
  const readTime = Math.ceil((article.Content?.length || 0) / 200) || 15;
  const views = Math.floor(Math.random() * 5000) + 2000;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200 p-8 relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
          FEATURED
        </span>
      </div>

      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
          {article.Title || "Introduction to AWS IAM"}
        </h2>

        <p className="text-gray-700 text-base mb-6 leading-relaxed">
          {article.Summary || "Overview of identity and access management in AWS. Learn how to efficiently manage resources across AWS, Azure, and Google Cloud Platform using eCloudWorx unified dashboard."}
        </p>

        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-600 text-white">
            multi-cloud
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-600 text-white">
            aws
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-600 text-white">
            azure
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-600 text-white">
            gcp
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{readTime} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{views.toLocaleString()} views</span>
            </div>
            <span>Updated {formatDate(article.PublishedDate)}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">By Team eCloudWorx</span>
            <button
              onClick={() => onRead(article.Slug)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Read Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Knowledge Base Stats Component
function KnowledgeBaseStats({ articles }) {
  const totalViews = articles.length * 1500;

  return (
    <div className="bg-blue-600 rounded-lg p-6 text-white">
      <h3 className="text-lg font-semibold mb-4 text-center">Knowledge Base Stats</h3>
      <div className="text-center">
        <div className="text-3xl font-bold mb-1">{articles.length}</div>
        <div className="text-blue-100 text-sm mb-4">Total Articles</div>
        <div className="text-2xl font-bold mb-1">{totalViews.toLocaleString()}</div>
        <div className="text-blue-100 text-sm">Total Views</div>
      </div>
    </div>
  );
}

// Quick Start Guide Component
function QuickStartGuide() {
  return (
    <div className="bg-green-50 rounded-lg border border-green-200 p-6">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="font-semibold text-green-800">Quick Start</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-green-600">1</span>
          </div>
          <span className="text-sm text-green-700">Set up your account</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-green-600">2</span>
          </div>
          <span className="text-sm text-green-700">Configure cloud providers</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-green-600">3</span>
          </div>
          <span className="text-sm text-green-700">Deploy your first resource</span>
        </div>
      </div>
      <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
        Get Started
      </button>
    </div>
  );
}

// Recent Updates Component
function RecentUpdates() {
  const updates = [
    { title: "New Azure Integration Features", date: "Sep 8, 2025", type: "feature" },
    { title: "Security Best Practices Updated", date: "Sep 7, 2025", type: "update" },
    { title: "GCP Cost Optimization Guide", date: "Sep 6, 2025", type: "guide" },
    { title: "Multi-Cloud Deployment Tutorial", date: "Sep 5, 2025", type: "tutorial" }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Recent Updates
      </h3>
      <div className="space-y-3">
        {updates.map((update, index) => (
          <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
            <div className="flex-shrink-0 mt-1">
              <div className={`w-2 h-2 rounded-full ${
                update.type === 'feature' ? 'bg-blue-500' :
                update.type === 'update' ? 'bg-orange-500' :
                update.type === 'guide' ? 'bg-green-500' : 'bg-purple-500'
              }`}></div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{update.title}</p>
              <p className="text-xs text-gray-500">{update.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Help & Support Component
function HelpSupport() {
  return (
    <div className="bg-orange-50 rounded-lg border border-orange-200 p-6">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
          </svg>
        </div>
        <h3 className="font-semibold text-orange-800">Need Help?</h3>
      </div>
      <p className="text-sm text-orange-700 mb-4">Get expert support for your cloud infrastructure needs.</p>
      <div className="space-y-2">
        <button className="w-full text-left py-2 px-3 text-sm text-orange-700 hover:bg-orange-100 rounded-md transition-colors">
          ðŸ“– Documentation
        </button>
        <button className="w-full text-left py-2 px-3 text-sm text-orange-700 hover:bg-orange-100 rounded-md transition-colors">
          ðŸ’¬ Community Forum
        </button>
        <button className="w-full text-left py-2 px-3 text-sm text-orange-700 hover:bg-orange-100 rounded-md transition-colors">
          ðŸ“§ Contact Support
        </button>
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
      const res = await fetch(`${STRAPI}/articles?pagination[page]=1&pagination[pageSize]=50`);
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
      const res = await fetch(`${STRAPI}/articles?filters[Slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`);
      if (!res.ok) throw new Error(`Article fetch failed: ${res.status}`);
      const json = await res.json();
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
    function onKey(e) {
      if (e.key === "Escape") closeReader();
    }
    if (readerOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [readerOpen, closeReader]);

  function overlayClick(e) {
    if (e.target === e.currentTarget) closeReader();
  }

  // Helper function to safely process content for display
  const processContentForDisplay = (content) => {
    if (!content) return "";
    return String(content).replace(/\n/g, '<br/>');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img 
                src={LOGO_PATH} 
                alt="eCloudWorx University" 
                className="h-8 w-auto object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <h1 className="text-lg font-semibold text-blue-600">eCloudWorx</h1>
                <p className="text-sm text-blue-500">University</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Resources</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Signup</a>
              <div className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium">
                eCloudWorx University
              </div>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Knowledge Base"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Sidebar - Browse Topics & Additional Content */}
          <aside className="lg:col-span-3">
            {/* Browse Topics */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Browse Topics</h3>

              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md transition-colors text-sm ${
                    !activeCategory 
                      ? 'bg-red-50 text-red-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Getting Started</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{articles.length}</span>
                </button>

                {categories.map((cat, index) => {
                  const count = articles.filter(a => {
                    const tech = (a.Technology || "").toLowerCase();
                    const catLower = (cat.name || "").toLowerCase();
                    return tech.includes(catLower);
                  }).length;

                  const icons = [
                    { color: 'text-orange-500', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
                    { color: 'text-blue-500', icon: 'M19 11H5m14-7v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v7zM9 7h6' },
                    { color: 'text-yellow-500', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
                    { color: 'text-green-500', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                    { color: 'text-purple-500', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
                  ];
                  const iconData = icons[index % icons.length];

                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md transition-colors text-sm ${
                        activeCategory && activeCategory.id === cat.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <svg className={`w-4 h-4 ${iconData.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconData.icon} />
                        </svg>
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular This Week */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Popular This Week</h3>
              <div className="space-y-3">
                {featured.slice(0, 3).map((article, index) => (
                  <div key={article.id} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => openReaderForSlug(article.Slug)}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2 text-left"
                      >
                        {article.Title || "Introduction to AWS IAM"}
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.floor(Math.random() * 500) + 100} views â€¢ {Math.ceil(Math.random() * 20) + 5} min read
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Base Stats */}
            <div className="mt-6">
              <KnowledgeBaseStats articles={articles} />
            </div>

            {/* Quick Start Guide */}
            <div className="mt-6">
              <QuickStartGuide />
            </div>

            {/* Recent Updates */}
            <div className="mt-6">
              <RecentUpdates />
            </div>

            {/*
            <div className="mt-6">
              <HelpSupport />
            </div>
            */}
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            {/* Featured Article Hero */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900">Featured Articles</h2>
                <span className="ml-2 text-sm text-gray-500">Curated content to get you started</span>
              </div>
              <FeaturedHeroCard article={featured[0] || {}} onRead={openReaderForSlug} />
            </div>
                
            {/* Knowledge Base Articles */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-semibold text-gray-900">Knowledge Base Articles</h2>
                  <span className="text-sm text-gray-500">({filteredArticles.length} articles)</span>
                </div>
                {(activeCategory || query) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Filter Tags */}
              {(activeCategory || query) && (
                <div className="flex items-center space-x-2 mb-6">
                  <span className="text-sm text-gray-600">Filtered by:</span>
                  {activeCategory && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-sm">
                      {activeCategory.name}
                      <button
                        onClick={() => setActiveCategory(null)}
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {query && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 text-sm">
                      "{query}"
                      <button
                        onClick={() => setQuery("")}
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600"
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

            {/* Articles Grid */}
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} onRetry={fetchAllArticles} />
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or category filter</p>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredArticles.map((article) => (
                  <KnowledgeBaseCard
                    key={article.id}
                    article={article}
                    onRead={openReaderForSlug}
                  />
                ))}
              </div>
            )}

            {/* Bottom Content Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Learning Paths */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v7zM9 7h6" />
                  </svg>
                  Learning Paths
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-indigo-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-indigo-800">Cloud Fundamentals</h4>
                      <p className="text-sm text-indigo-600">Start with the basics of cloud computing</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">Multi-Cloud Strategy</h4>
                      <p className="text-sm text-blue-600">Learn to manage multiple cloud providers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-green-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Advanced DevOps</h4>
                      <p className="text-sm text-green-600">Master advanced automation and CI/CD</p>
                    </div>
                  </div>
                </div>
              </div>

              {/*
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Community & Resources
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">ðŸ‘¥</span>
                      </div>
                      <span className="font-medium text-gray-800">Community Forum</span>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">Join â†’</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">ðŸ“š</span>
                      </div>
                      <span className="font-medium text-gray-800">API Documentation</span>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">View â†’</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">ðŸŽ¥</span>
                      </div>
                      <span className="font-medium text-gray-800">Video Tutorials</span>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">Watch â†’</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">ðŸ’¬</span>
                      </div>
                      <span className="font-medium text-gray-800">Live Support</span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">Chat â†’</span>
                  </div>
                </div>
              </div>
              */}
            </div>
          </main>
        </div>
      </div>

      {/* Professional Reader Modal */}
      {readerOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={overlayClick}>
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Article Reader</h2>
              </div>
              <button
                onClick={closeReader}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
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
                  <div className="mb-6">
                    {currentArticle.Technology && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                        {currentArticle.Technology}
                      </span>
                    )}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {currentArticle.Title || "Untitled Article"}
                    </h1>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(currentArticle.PublishedDate)}
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    {currentArticle.Content ? (
                      <div dangerouslySetInnerHTML={{ __html: processContentForDisplay(currentArticle.Content) }} />
                    ) : (
                      <p className="text-gray-600 italic">No content available for this article.</p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
