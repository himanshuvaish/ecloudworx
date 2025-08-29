import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useArticles } from '../contexts/ArticleContext';
import { PlusCircle, FileText, Eye, Calendar, TrendingUp } from 'lucide-react';
import Button from '../components/Button';
import { format } from 'date-fns';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getUserArticles } = useArticles();
  
  const userArticles = getUserArticles();
  const totalViews = userArticles.reduce((sum, article) => sum + (article.views || 0), 0);
  const publishedArticles = userArticles.filter(article => article.status === 'published');
  const recentArticles = userArticles
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 5);

  const stats = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      label: "Articles Written",
      value: userArticles.length,
      bgColor: "bg-blue-50"
    },
    {
      icon: <Eye className="h-8 w-8 text-green-600" />,
      label: "Total Views",
      value: totalViews.toLocaleString(),
      bgColor: "bg-green-50"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      label: "Published",
      value: publishedArticles.length,
      bgColor: "bg-purple-50"
    },
    {
      icon: <Calendar className="h-8 w-8 text-orange-600" />,
      label: "Member Since",
      value: new Date(user.createdAt).getFullYear(),
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your knowledge base and track your contributions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-6`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => navigate('/articles/new')}>
            <PlusCircle className="h-5 w-5 mr-2" />
            Write New Article
          </Button>
          <Button variant="outline" onClick={() => navigate('/articles')}>
            <FileText className="h-5 w-5 mr-2" />
            View All Articles
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Articles</h2>
        </div>
        <div className="p-6">
          {recentArticles.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
              <p className="text-gray-600 mb-4">Start sharing your cloud expertise with the community</p>
              <Button onClick={() => navigate('/articles/new')}>
                <PlusCircle className="h-5 w-5 mr-2" />
                Write Your First Article
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {article.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(article.updatedAt || article.createdAt), 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {article.views || 0} views
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          article.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.status}
                        </span>
                        <span className="text-blue-600">{article.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
