import { type User, type InsertUser, type Category, type InsertCategory, type Article, type InsertArticle } from "@shared/schema";
import { IStorage } from "./storage";

export class DBServiceStorage implements IStorage {
  private dbServiceUrl: string;

  constructor() {
    this.dbServiceUrl = process.env.DB_SERVICE_URL || 'http://db-service:6001';
  }

  private async apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.dbServiceUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`DB Service request failed: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      return await this.apiRequest<User>(`/api/users/${id}`);
    } catch (error) {
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      return await this.apiRequest<User>(`/api/users/by-username/${username}`);
    } catch (error) {
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    return await this.apiRequest<User>('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  async getCategories(): Promise<Category[]> {
    return await this.apiRequest<Category[]>('/api/categories');
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    try {
      return await this.apiRequest<Category>(`/api/categories/${id}`);
    } catch (error) {
      return undefined;
    }
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    return await this.apiRequest<Category>('/api/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    });
  }

  async updateCategoryArticleCount(categoryId: string, count: number): Promise<void> {
    await this.apiRequest(`/api/categories/${categoryId}/article-count`, {
      method: 'PATCH',
      body: JSON.stringify({ count }),
    });
  }

  async getArticles(searchTerm?: string, categoryId?: string): Promise<Article[]> {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (categoryId) params.append('categoryId', categoryId);
    
    const query = params.toString();
    return await this.apiRequest<Article[]>(`/api/articles${query ? `?${query}` : ''}`);
  }

  async getArticleById(id: string): Promise<Article | undefined> {
    try {
      return await this.apiRequest<Article>(`/api/articles/${id}`);
    } catch (error) {
      return undefined;
    }
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    return await this.apiRequest<Article>('/api/articles', {
      method: 'POST',
      body: JSON.stringify(article),
    });
  }

  async incrementArticleViews(id: string): Promise<void> {
    await this.apiRequest(`/api/articles/${id}/views`, {
      method: 'PATCH',
    });
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return await this.apiRequest<Article[]>('/api/articles/featured');
  }

  async getPopularArticles(limit: number = 10): Promise<Article[]> {
    return await this.apiRequest<Article[]>(`/api/articles/popular?limit=${limit}`);
  }

  async getArticlesByCategory(categoryId: string): Promise<Article[]> {
    return await this.apiRequest<Article[]>(`/api/articles/by-category/${categoryId}`);
  }
}