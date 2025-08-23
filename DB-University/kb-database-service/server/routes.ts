import type { Express } from "express";
import { db } from "./db.js";
import { users, categories, articles, insertUserSchema, insertCategorySchema, insertArticleSchema } from "../shared/schema.js";
import { eq, ilike, and, desc } from "drizzle-orm";
import { z } from "zod";

export function registerRoutes(app: Express) {
  // Health check
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "db-service", timestamp: new Date().toISOString() });
  });

  // Categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const result = await db.select().from(categories);
      res.json(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const [category] = await db.select().from(categories).where(eq(categories.id, id));
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const [category] = await db
        .insert(categories)
        .values(validatedData)
        .returning();
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid category data", errors: error.errors });
      } else {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Failed to create category" });
      }
    }
  });

  app.patch("/api/categories/:id/article-count", async (req, res) => {
    try {
      const { id } = req.params;
      const { count } = req.body;
      
      if (typeof count !== 'number') {
        return res.status(400).json({ message: "Count must be a number" });
      }

      await db
        .update(categories)
        .set({ articleCount: count })
        .where(eq(categories.id, id));
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating article count:", error);
      res.status(500).json({ message: "Failed to update article count" });
    }
  });

  // Articles
  app.get("/api/articles", async (req, res) => {
    try {
      const { search, categoryId } = req.query;
      
      let query = db.select().from(articles);
      const conditions = [];

      if (categoryId) {
        conditions.push(eq(articles.categoryId, categoryId as string));
      }

      if (search) {
        const searchTerm = `%${search}%`;
        conditions.push(
          ilike(articles.title, searchTerm)
        );
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }

      const result = await query.orderBy(desc(articles.isFeatured), desc(articles.views));
      res.json(result);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const [article] = await db.select().from(articles).where(eq(articles.id, id));
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", async (req, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const [article] = await db
        .insert(articles)
        .values(validatedData)
        .returning();

      // Update category article count
      const articleCount = await db.select({ count: articles.id }).from(articles).where(eq(articles.categoryId, validatedData.categoryId));
      const count = articleCount.length;
      await db
        .update(categories)
        .set({ articleCount: count })
        .where(eq(categories.id, validatedData.categoryId));

      res.status(201).json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid article data", errors: error.errors });
      } else {
        console.error("Error creating article:", error);
        res.status(500).json({ message: "Failed to create article" });
      }
    }
  });

  app.patch("/api/articles/:id/views", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Get current views count and increment by 1
      const [currentArticle] = await db.select().from(articles).where(eq(articles.id, id));
      if (currentArticle) {
        await db
          .update(articles)
          .set({ views: (currentArticle.views || 0) + 1 })
          .where(eq(articles.id, id));
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error incrementing views:", error);
      res.status(500).json({ message: "Failed to increment views" });
    }
  });

  app.get("/api/articles/featured", async (_req, res) => {
    try {
      const result = await db
        .select()
        .from(articles)
        .where(eq(articles.isFeatured, true))
        .orderBy(desc(articles.views));
      
      res.json(result);
    } catch (error) {
      console.error("Error fetching featured articles:", error);
      res.status(500).json({ message: "Failed to fetch featured articles" });
    }
  });

  app.get("/api/articles/popular", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await db
        .select()
        .from(articles)
        .orderBy(desc(articles.views))
        .limit(limit);
      
      res.json(result);
    } catch (error) {
      console.error("Error fetching popular articles:", error);
      res.status(500).json({ message: "Failed to fetch popular articles" });
    }
  });

  app.get("/api/articles/by-category/:categoryId", async (req, res) => {
    try {
      const { categoryId } = req.params;
      const result = await db
        .select()
        .from(articles)
        .where(eq(articles.categoryId, categoryId))
        .orderBy(desc(articles.views));
      
      res.json(result);
    } catch (error) {
      console.error("Error fetching articles by category:", error);
      res.status(500).json({ message: "Failed to fetch articles by category" });
    }
  });

  // Users
  app.get("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const [user] = await db.select().from(users).where(eq(users.id, id));
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/users/by-username/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const [user] = await db.select().from(users).where(eq(users.username, username));
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user by username:", error);
      res.status(500).json({ message: "Failed to fetch user by username" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const [user] = await db
        .insert(users)
        .values(validatedData)
        .returning();
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });
}