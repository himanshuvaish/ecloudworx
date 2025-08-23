import { type User, type InsertUser, type Category, type InsertCategory, type Article, type InsertArticle } from "@shared/schema";
import { randomUUID } from "crypto";
import { DBServiceStorage } from "./db-service-storage";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategoryArticleCount(categoryId: string, count: number): Promise<void>;
  
  // Articles
  getArticles(searchTerm?: string, categoryId?: string): Promise<Article[]>;
  getArticleById(id: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  incrementArticleViews(id: string): Promise<void>;
  getFeaturedArticles(): Promise<Article[]>;
  getPopularArticles(limit?: number): Promise<Article[]>;
  getArticlesByCategory(categoryId: string): Promise<Article[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private articles: Map<string, Article>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.articles = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoriesData = [
      { name: "Getting Started", icon: "fas fa-cloud-upload", description: "Essential guides for beginners" },
      { name: "AWS Management", icon: "fab fa-aws", description: "Amazon Web Services integration" },
      { name: "Azure Integration", icon: "fab fa-microsoft", description: "Microsoft Azure platform guides" },
      { name: "Google Cloud", icon: "fab fa-google", description: "Google Cloud Platform tutorials" },
      { name: "Monitoring & Analytics", icon: "fas fa-chart-line", description: "Performance monitoring guides" },
      { name: "Security & Compliance", icon: "fas fa-shield-alt", description: "Security best practices" },
      { name: "Troubleshooting", icon: "fas fa-question-circle", description: "Common issues and solutions" },
    ];

    categoriesData.forEach(cat => {
      const id = randomUUID();
      const category: Category = { 
        ...cat, 
        id, 
        articleCount: 0,
        description: cat.description || null
      };
      this.categories.set(id, category);
    });

    // Seed articles
    const categoryIds = Array.from(this.categories.keys());
    const articlesData = [
      {
        title: "Complete Guide to Multi-Cloud Management with eCloudWorx",
        excerpt: "Learn how to efficiently manage resources across AWS, Azure, and Google Cloud Platform using eCloudWorx unified dashboard. This comprehensive guide covers setup, configuration, and best practices.",
        content: "Learn how to efficiently manage resources across AWS, Azure, and Google Cloud Platform using eCloudWorx unified dashboard...",
        categoryId: categoryIds[0],
        tags: ["automation", "multi-cloud", "setup"],
        readTime: 15,
        isFeatured: true,
        isVerified: true,
        views: 2847,
      },
      {
        title: "Setting Up AWS Cost Optimization Alerts",
        excerpt: "Configure automated alerts to monitor and control AWS spending. Learn how to set up budget thresholds and receive notifications before costs exceed your limits.",
        content: "Configure automated alerts to monitor and control AWS spending...",
        categoryId: categoryIds[1],
        tags: ["aws", "cost-optimization", "alerts"],
        readTime: 8,
        isFeatured: false,
        isVerified: true,
        views: 1234,
      },
      {
        title: "Azure Resource Group Management Best Practices",
        excerpt: "Organize and manage Azure resources efficiently using resource groups. Discover naming conventions, tagging strategies, and automation techniques.",
        content: "Organize and manage Azure resources efficiently using resource groups...",
        categoryId: categoryIds[2],
        tags: ["azure", "resource-groups", "best-practices"],
        readTime: 12,
        isFeatured: false,
        isVerified: true,
        views: 892,
      },
      {
        title: "GCP IAM Security Configuration Guide",
        excerpt: "Implement secure access controls in Google Cloud Platform. Learn about service accounts, roles, and policies to protect your cloud infrastructure.",
        content: "Implement secure access controls in Google Cloud Platform...",
        categoryId: categoryIds[3],
        tags: ["gcp", "security", "iam"],
        readTime: 18,
        isFeatured: false,
        isVerified: true,
        views: 1567,
      },
      {
        title: "Multi-Cloud Security Compliance Checklist",
        excerpt: "Ensure your multi-cloud environment meets industry security standards. Complete checklist for SOC2, GDPR, and HIPAA compliance across cloud providers.",
        content: "Ensure your multi-cloud environment meets industry security standards...",
        categoryId: categoryIds[5],
        tags: ["security", "compliance", "checklist"],
        readTime: 25,
        isFeatured: false,
        isVerified: true,
        views: 2103,
      },
    ];

    articlesData.forEach(art => {
      const id = randomUUID();
      const article: Article = { 
        ...art, 
        id, 
        lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date within last week
      };
      this.articles.set(id, article);
      
      // Update category article count
      const category = this.categories.get(art.categoryId);
      if (category) {
        category.articleCount = (category.articleCount || 0) + 1;
        this.categories.set(art.categoryId, category);
      }
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id, articleCount: 0 };
    this.categories.set(id, category);
    return category;
  }

  async updateCategoryArticleCount(categoryId: string, count: number): Promise<void> {
    const category = this.categories.get(categoryId);
    if (category) {
      category.articleCount = count;
      this.categories.set(categoryId, category);
    }
  }

  async getArticles(searchTerm?: string, categoryId?: string): Promise<Article[]> {
    let articles = Array.from(this.articles.values());
    
    if (categoryId) {
      articles = articles.filter(article => article.categoryId === categoryId);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term) ||
        article.content.toLowerCase().includes(term) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    return articles.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return (b.views || 0) - (a.views || 0);
    });
  }

  async getArticleById(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const article: Article = { 
      ...insertArticle, 
      id, 
      views: 0,
      lastUpdated: new Date(),
      tags: insertArticle.tags || null,
      isFeatured: insertArticle.isFeatured || false,
      isVerified: insertArticle.isVerified || true
    };
    this.articles.set(id, article);
    
    // Update category article count
    const category = this.categories.get(insertArticle.categoryId);
    if (category) {
      category.articleCount = (category.articleCount || 0) + 1;
      this.categories.set(insertArticle.categoryId, category);
    }
    
    return article;
  }

  async incrementArticleViews(id: string): Promise<void> {
    const article = this.articles.get(id);
    if (article) {
      article.views = (article.views || 0) + 1;
      this.articles.set(id, article);
    }
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.isFeatured)
      .sort((a, b) => (b.views || 0) - (a.views || 0));
  }

  async getPopularArticles(limit: number = 10): Promise<Article[]> {
    return Array.from(this.articles.values())
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit);
  }

  async getArticlesByCategory(categoryId: string): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.categoryId === categoryId)
      .sort((a, b) => (b.views || 0) - (a.views || 0));
  }
}

// Use DB service storage in production, memory storage in development
export const storage = process.env.NODE_ENV === 'production' 
  ? new DBServiceStorage()
  : new MemStorage();
