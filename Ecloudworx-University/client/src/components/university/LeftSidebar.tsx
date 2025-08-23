import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";

interface LeftSidebarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategoryId?: string;
  onCategorySelect: (categoryId?: string) => void;
}

export default function LeftSidebar({ 
  searchTerm, 
  onSearchChange, 
  selectedCategoryId, 
  onCategorySelect 
}: LeftSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const popularTags = ["automation", "cost-optimization", "migration", "backup", "monitoring"];

  const handleTagClick = (tag: string) => {
    onSearchChange(tag);
  };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
        {/* Search Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <i className="fas fa-search text-primary-500 mr-2"></i>
            Search Knowledge Base
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles, tutorials, guides..."
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              data-testid="input-search"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* Topics Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <i className="fas fa-folder text-primary-500 mr-2"></i>
            Browse Topics
          </h3>
          
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="topic-category">
                <button
                  className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-gray-50 transition-colors group"
                  onClick={() => {
                    toggleCategory(category.id);
                    onCategorySelect(selectedCategoryId === category.id ? undefined : category.id);
                  }}
                  data-testid={`button-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center">
                    <i className={`${category.icon} text-primary-500 mr-3`}></i>
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      {category.articleCount}
                    </span>
                  </div>
                  <i 
                    className={`fas fa-chevron-down text-gray-400 group-hover:text-gray-600 transition-all ${
                      expandedCategories.has(category.id) ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
              </div>
            ))}
          </div>

          {/* Popular Tags */}
          <div className="mt-8">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Popular Tags</h4>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-primary-100 hover:text-primary-700 cursor-pointer transition-colors"
                  onClick={() => handleTagClick(tag)}
                  data-testid={`tag-${tag}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
