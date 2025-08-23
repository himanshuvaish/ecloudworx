import { Article } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

interface ArticleReaderProps {
  article: Article;
  onBackToList: () => void;
}

export default function ArticleReader({ article, onBackToList }: ArticleReaderProps) {
  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat: any) => cat.id === categoryId);
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

  // Generate detailed article content based on the title and excerpt
  const generateDetailedContent = (article: Article) => {
    const sections = [
      {
        id: "introduction",
        title: "Introduction",
        content: `${article.excerpt}\n\nThis comprehensive guide will walk you through every aspect of the topic, providing practical examples and best practices that you can implement immediately.`
      },
      {
        id: "prerequisites",
        title: "Prerequisites",
        content: "Before we begin, ensure you have:\n\n• Administrative access to your cloud environment\n• Basic understanding of cloud concepts\n• Required permissions and credentials configured\n• Familiarity with the eCloudWorx dashboard"
      },
      {
        id: "step-by-step",
        title: "Step-by-Step Implementation",
        content: "Follow these detailed steps to implement the solution:\n\n1. **Initial Setup**: Configure your environment with the necessary prerequisites\n2. **Configuration**: Apply the recommended settings and configurations\n3. **Testing**: Verify your implementation works as expected\n4. **Optimization**: Fine-tune the setup for optimal performance"
      },
      {
        id: "best-practices",
        title: "Best Practices",
        content: "• Always test changes in a development environment first\n• Keep detailed documentation of your configurations\n• Monitor performance metrics regularly\n• Implement proper security measures\n• Regular backup and recovery procedures"
      }
    ];

    return sections;
  };

  const articleSections = generateDetailedContent(article);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <button
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
          onClick={onBackToList}
          data-testid="button-back-to-list"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Knowledge Base
        </button>
        
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4" data-testid="text-article-title">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-6">
              <span data-testid="text-read-time">
                <i className="far fa-clock mr-1"></i>
                {article.readTime} min read
              </span>
              <span data-testid="text-views">
                <i className="far fa-eye mr-1"></i>
                {article.views?.toLocaleString()} views
              </span>
              <span data-testid="text-last-updated">
                <i className="far fa-calendar mr-1"></i>
                {formatDate(article.lastUpdated)}
              </span>
              {article.isVerified && (
                <span className="text-green-600 font-medium">
                  <i className="fas fa-check mr-1"></i>
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors" 
                title="Print article"
                data-testid="button-print"
              >
                <i className="fas fa-print"></i>
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors" 
                title="Share article"
                data-testid="button-share"
              >
                <i className="fas fa-share"></i>
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors" 
                title="Bookmark article"
                data-testid="button-bookmark"
              >
                <i className="far fa-bookmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 font-medium mb-6">
            {article.excerpt}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Table of Contents</h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <ul className="space-y-2">
              {articleSections.map((section, index) => (
                <li key={section.id}>
                  <a 
                    href={`#${section.id}`} 
                    className="text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {articleSections.map((section) => (
            <div key={section.id} id={section.id} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {section.title}
              </h2>
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {section.content}
              </div>
              
              {section.id === "prerequisites" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start">
                    <i className="fas fa-info-circle text-blue-600 mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Pro Tip</h4>
                      <p className="text-blue-800 text-sm">
                        Start with a small test environment to familiarize yourself with the process before implementing in production.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {section.id === "step-by-step" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start">
                    <i className="fas fa-exclamation-triangle text-yellow-600 mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">Important</h4>
                      <p className="text-yellow-800 text-sm">
                        Always backup your current configuration before making changes to ensure you can revert if needed.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer">
                <h4 className="font-medium text-gray-900 mb-2">Advanced Configuration Tips</h4>
                <p className="text-sm text-gray-600">Learn advanced techniques for optimizing your setup.</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer">
                <h4 className="font-medium text-gray-900 mb-2">Troubleshooting Common Issues</h4>
                <p className="text-sm text-gray-600">Solutions for the most common problems you might encounter.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Was this article helpful?</h3>
          <div className="flex items-center space-x-4 mb-6">
            <button 
              className="flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
              data-testid="button-helpful-yes"
            >
              <i className="fas fa-thumbs-up mr-2"></i>
              Yes (247)
            </button>
            <button 
              className="flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
              data-testid="button-helpful-no"
            >
              <i className="fas fa-thumbs-down mr-2"></i>
              No (12)
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
              Additional feedback (optional)
            </label>
            <textarea
              id="feedback"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Let us know how we can improve this article..."
              data-testid="textarea-feedback"
            />
            <button 
              className="mt-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
              data-testid="button-submit-feedback"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
