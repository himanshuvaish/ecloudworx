import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE } from '../config';
import { useAuth } from './AuthContext';

const ArticleContext = createContext();

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};

const CATEGORIES = [
  'Cloud Architecture',
  'DevOps',
  'Security',
  'Containers',
  'Serverless',
  'Networking',
  'Database',
  'Monitoring',
  'Infrastructure as Code',
  'Multi-Cloud'
];

export const ArticleProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const headers = () => ({
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  });

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/articles`, {
        headers: headers()
      });

      if (response.ok) {
        const data = await response.json();
        // Process tags if they're comma-separated strings
        const processedData = data.map(article => ({
          ...article,
          tags: typeof article.tags === 'string' 
            ? article.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            : article.tags || []
        }));
        setArticles(processedData);
      } else {
        console.error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (articleData) => {
    try {
      const response = await fetch(`${API_BASE}/articles`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
          ...articleData,
          tags: Array.isArray(articleData.tags) ? articleData.tags.join(',') : articleData.tags
        })
      });

      if (response.ok) {
        const newArticle = await response.json();
        // Process tags for display
        const processedArticle = {
          ...newArticle,
          tags: typeof newArticle.tags === 'string' 
            ? newArticle.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            : newArticle.tags || []
        };
        setArticles(prev => [processedArticle, ...prev]);
        return processedArticle;
      } else {
        console.error('Failed to create article');
        return null;
      }
    } catch (error) {
      console.error('Error creating article:', error);
      return null;
    }
  };

  const updateArticle = async (id, articleData) => {
    try {
      const response = await fetch(`${API_BASE}/articles/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({
          ...articleData,
          tags: Array.isArray(articleData.tags) ? articleData.tags.join(',') : articleData.tags
        })
      });

      if (response.ok) {
        const updatedArticle = await response.json();
        // Process tags for display
        const processedArticle = {
          ...updatedArticle,
          tags: typeof updatedArticle.tags === 'string' 
            ? updatedArticle.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            : updatedArticle.tags || []
        };
        setArticles(prev => prev.map(article => 
          article.id === id ? processedArticle : article
        ));
        return processedArticle;
      } else {
        console.error('Failed to update article');
        return null;
      }
    } catch (error) {
      console.error('Error updating article:', error);
      return null;
    }
  };

  const deleteArticle = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/articles/${id}`, {
        method: 'DELETE',
        headers: headers()
      });

      if (response.ok) {
        setArticles(prev => prev.filter(article => article.id !== id));
        return true;
      } else {
        console.error('Failed to delete article');
        return false;
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      return false;
    }
  };

  const getArticleById = (id) => {
    return articles.find(article => article.id === parseInt(id));
  };

  const getUserArticles = () => {
    return user ? articles.filter(article => article.authorId === user.id) : [];
  };

  const incrementViews = (id) => {
    setArticles(prev => prev.map(article => 
      article.id === parseInt(id) ? { ...article, views: (article.views || 0) + 1 } : article
    ));
  };

  // Fetch articles when token changes (login/logout)
  // useEffect(() => {
  //   if (token) {
  //     fetchArticles();
  //   } else {
  //     setArticles([]);
  //   }
  // }, [token]);

  useEffect(() => {
  if (token) {
    fetchArticles();
  } else {
    setArticles([]);
  }
   }, [token, fetchArticles]);


  const value = {
    articles,
    loading,
    categories: CATEGORIES,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
    getUserArticles,
    incrementViews
  };

  return (
    <ArticleContext.Provider value={value}>
      {children}
    </ArticleContext.Provider>
  );
};
