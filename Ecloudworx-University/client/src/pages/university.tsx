import { useState } from "react";
import NavigationHeader from "@/components/university/NavigationHeader";
import LeftSidebar from "@/components/university/LeftSidebar";
import ArticleList from "@/components/university/ArticleList";
import ArticleReader from "@/components/university/ArticleReader";
import RightSidebar from "@/components/university/RightSidebar";
import { Article } from "@shared/schema";

export default function University() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>();

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="hover:text-gray-700 cursor-pointer">Home</span>
            <i className="fas fa-chevron-right mx-2 text-xs"></i>
            <span className="text-gray-900">eCloudWorx University</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">eCloudWorx University</h1>
          <p className="text-lg text-gray-600">Your comprehensive knowledge base for cloud management, tutorials, and best practices.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <LeftSidebar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={setSelectedCategoryId}
          />
          
          <main className="flex-1">
            {selectedArticle ? (
              <ArticleReader 
                article={selectedArticle}
                onBackToList={handleBackToList}
              />
            ) : (
              <ArticleList 
                searchTerm={searchTerm}
                categoryId={selectedCategoryId}
                onArticleSelect={handleArticleSelect}
              />
            )}
          </main>
          
          <RightSidebar onArticleSelect={handleArticleSelect} />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <i className="fas fa-cloud text-primary-400 text-2xl mr-2"></i>
                <span className="font-bold text-xl">eCloudWorx</span>
              </div>
              <p className="text-gray-400 mb-4">
                Simplifying cloud management across AWS, Azure, and Google Cloud Platform with unified dashboard and powerful automation tools.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Practices</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status Page</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 eCloudWorx. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
