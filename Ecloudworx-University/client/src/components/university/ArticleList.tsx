import { useQuery } from "@tanstack/react-query";
import { Article, Category } from "@shared/schema";

interface ArticleListProps {
  searchTerm: string;
  categoryId?: string;
  onArticleSelect: (article: Article) => void;
}

export default function ArticleList({ searchTerm, categoryId, onArticleSelect }: ArticleListProps) {
  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", { search: searchTerm, categoryId }],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = getCategoryById(categoryId);
    return category?.icon || "fas fa-file-alt";
  };

  const getCategoryName = (categoryId: string) => {
    const category = getCategoryById(categoryId);
    return category?.name || "General";
  };

  const getCategoryColor = (categoryName: string) => {
    const colorMap: Record<string, string> = {
      "Getting Started": "bg-yellow-100 text-yellow-800",
      "AWS Management": "bg-blue-100 text-blue-800",
      "Azure Integration": "bg-purple-100 text-purple-800",
      "Google Cloud": "bg-red-100 text-red-800",
      "Monitoring & Analytics": "bg-green-100 text-green-800",
      "Security & Compliance": "bg-green-100 text-green-800",
      "Troubleshooting": "bg-gray-100 text-gray-800",
    };
    return colorMap[categoryName] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Updated today";
    if (diffInDays === 1) return "Updated 1 day ago";
    if (diffInDays < 7) return `Updated ${diffInDays} days ago`;
    if (diffInDays < 14) return "Updated 1 week ago";
    return `Updated ${Math.floor(diffInDays / 7)} weeks ago`;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Knowledge Base Articles</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500" data-testid="text-article-count">
              Showing {articles.length} articles
            </span>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>Sort by Relevance</option>
              <option>Sort by Date</option>
              <option>Sort by Views</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {articles.length === 0 ? (
          <div className="p-12 text-center">
            <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse different categories.
            </p>
          </div>
        ) : (
          articles.map((article) => (
            <article
              key={article.id}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onArticleSelect(article)}
              data-testid={`article-${article.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    article.isFeatured ? 'bg-yellow-100' : 'bg-primary-100'
                  }`}>
                    <i className={`${getCategoryIcon(article.categoryId)} ${
                      article.isFeatured ? 'text-yellow-600' : 'text-primary-600'
                    }`}></i>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    {article.isFeatured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <i className="fas fa-crown mr-1"></i>
                        Featured
                      </span>
                    )}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(getCategoryName(article.categoryId))}`}>
                      {getCategoryName(article.categoryId)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span data-testid={`text-read-time-${article.id}`}>
                        <i className="far fa-clock mr-1"></i>
                        {article.readTime} min read
                      </span>
                      <span data-testid={`text-views-${article.id}`}>
                        <i className="far fa-eye mr-1"></i>
                        {article.views?.toLocaleString()} views
                      </span>
                      <span data-testid={`text-last-updated-${article.id}`}>
                        <i className="far fa-calendar mr-1"></i>
                        {formatDate(article.lastUpdated)}
                      </span>
                    </div>
                    {article.isVerified && (
                      <div className="flex items-center">
                        <div className="flex -space-x-1">
                          <div className="w-6 h-6 rounded-full bg-green-100 border-2 border-white flex items-center justify-center">
                            <i className="fas fa-check text-xs text-green-600"></i>
                          </div>
                        </div>
                        <span className="ml-2 text-green-600 font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {articles.length > 0 && (
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(10, articles.length)}</span> of{" "}
              <span className="font-medium">{articles.length}</span> results
            </p>
            <div className="flex items-center space-x-2">
              <button 
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" 
                disabled
                data-testid="button-previous"
              >
                Previous
              </button>
              <button className="px-3 py-2 text-sm font-medium text-white bg-primary-600 border border-primary-600 rounded-md hover:bg-primary-700">
                1
              </button>
              <button 
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                data-testid="button-next"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
