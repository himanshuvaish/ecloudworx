import { Request, Response } from 'express';
import { Article } from '../models';

export async function listArticles(req: Request, res: Response) {
  const articles = await Article.findAll();
  res.json(articles);
}

export async function createArticle(req: Request, res: Response) {
  const { title, content, category, tags } = req.body;
  const authorId = (req as any).userId;
  const article = await Article.create({ title, content, category, tags, authorId });
  res.status(201).json(article);
}

export async function getArticle(req: Request, res: Response) {
  const article = await Article.findByPk(req.params.id);
  if (!article) return res.status(404).json({ error: 'Not found' });
  res.json(article);
}

export async function updateArticle(req: Request, res: Response) {
  const article = await Article.findByPk(req.params.id);
  if (!article) return res.status(404).json({ error: 'Not found' });
  Object.assign(article, req.body);
  await article.save();
  res.json(article);
}

export async function deleteArticle(req: Request, res: Response) {
  const article = await Article.findByPk(req.params.id);
  if (!article) return res.status(404).json({ error: 'Not found' });
  await article.destroy();
  res.status(204).send();
}
