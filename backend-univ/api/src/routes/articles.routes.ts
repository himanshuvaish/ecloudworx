import { Router } from 'express';
import { listArticles, createArticle, getArticle, updateArticle, deleteArticle } from '../controllers/articles.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
router.get('/', listArticles);
router.post('/', authenticate, createArticle);
router.get('/:id', getArticle);
router.put('/:id', authenticate, updateArticle);
router.delete('/:id', authenticate, deleteArticle);
export default router;
