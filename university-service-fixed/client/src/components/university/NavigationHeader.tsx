import { useState } from "react";

export default function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="fas fa-cloud text-primary-500 text-2xl mr-2"></i>
              <span className="font-bold text-xl text-gray-900">eCloudWorx</span>
              <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded">
                University
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
              Features
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
              Pricing
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
              Resources
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
              Signup
            </a>
            <a href="#" className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
              eCloudWorx University
            </a>
          </nav>
          
          <button 
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <a href="#" className="px-4 py-2 text-gray-500 hover:text-gray-900 font-medium">
                Features
              </a>
              <a href="#" className="px-4 py-2 text-gray-500 hover:text-gray-900 font-medium">
                Pricing
              </a>
              <a href="#" className="px-4 py-2 text-gray-500 hover:text-gray-900 font-medium">
                Resources
              </a>
              <a href="#" className="px-4 py-2 text-gray-500 hover:text-gray-900 font-medium">
                Signup
              </a>
              <a href="#" className="px-4 py-2 text-primary-500 hover:text-primary-600 font-medium">
                eCloudWorx University
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
