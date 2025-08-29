import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE } from '../config';
import { useAuth } from './AuthContext';

export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  authorId: number;
  status: string;
  views: number;
}

interface ArticleContextValue {
  articles: Article[];
  fetchArticles: () => Promise<void>;
  createArticle: (data: Partial<Article>) => Promise<Article | null>;
  updateArticle: (id: number, data: Partial<Article>) => Promise<Article | null>;
  deleteArticle: (id: number) => Promise<boolean>;
}

const ArticleContext = createContext<ArticleContextValue>(null!);

export const useArticles = (): ArticleContextValue => useContext(ArticleContext);

export const ArticleProvider: React.FC = ({ children }) => {
  const { token } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);

  const headers = () => ({
    'Content-Type':'application/json',
    Authorization: `Bearer ${token}`
  });

  const fetchArticles = async () => {
    const res = await fetch(`${API_BASE}/articles`, {
      headers: token ? headers() : { 'Content-Type':'application/json' }
    });
    if (res.ok) {
      setArticles(await res.json());
    }
  };

  const createArticle = async (data: Partial<Article>): Promise<Article | null> => {
    const res = await fetch(`${API_BASE}/articles`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    });
    if (!res.ok) return null;
    const article = await res.json();
    setArticles(prev => [article, ...prev]);
    return article;
  };

  const updateArticle = async (id: number, data: Partial<Article>): Promise<Article | null> => {
    const res = await fetch(`${API_BASE}/articles/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data)
    });
    if (!res.ok) return null;
    const updated = await res.json();
    setArticles(prev => prev.map(a => a.id === id ? updated : a));
    return updated;
  };

  const deleteArticle = async (id: number): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/articles/${id}`, {
      method: 'DELETE',
      headers: headers()
    });
    if (res.ok) {
      setArticles(prev => prev.filter(a => a.id !== id));
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchArticles();
  }, [token]);

  return (
    <ArticleContext.Provider value={{ articles, fetchArticles, createArticle, updateArticle, deleteArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};
