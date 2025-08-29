import { useQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";

interface RightSidebarProps {
  onArticleSelect: (article: Article) => void;
}

export default function RightSidebar({ onArticleSelect }: RightSidebarProps) {
  const { data: popularArticles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles/popular", { limit: 3 }],
  });

  const { data: allArticles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const totalViews = allArticles.reduce((sum, article) => sum + (article.views || 0), 0);

  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          <i className="fas fa-fire text-primary-500 mr-2"></i>
          Popular This Week
        </h3>
        
        <div className="space-y-4">
          {popularArticles.map((article, index) => (
            <div
              key={article.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onArticleSelect(article)}
              data-testid={`popular-article-${index + 1}`}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-600">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-500">
                  <i className="far fa-eye mr-1"></i>
                  {article.views?.toLocaleString()} views
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Quick Actions</h4>
          <div className="space-y-3">
            <button 
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 border border-primary-200 rounded-md hover:bg-primary-100 transition-colors"
              data-testid="button-suggest-article"
            >
              <i className="fas fa-plus mr-2"></i>
              Suggest Article
            </button>
            <button 
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
              data-testid="button-download-pdf"
            >
              <i className="fas fa-download mr-2"></i>
              Download PDF
            </button>
            <button 
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
              data-testid="button-email-support"
            >
              <i className="fas fa-envelope mr-2"></i>
              Email Support
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Knowledge Base Stats</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600" data-testid="text-total-articles">
                {allArticles.length}
              </div>
              <div className="text-xs text-gray-600">Total Articles</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600" data-testid="text-total-views">
                {totalViews > 1000 ? `${(totalViews / 1000).toFixed(1)}K` : totalViews}
              </div>
              <div className="text-xs text-gray-600">Total Views</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
