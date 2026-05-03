
import { Router } from 'express';
import { body } from 'express-validator';
import * as bookController from '../controllers/book.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

const bookValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('author').trim().notEmpty().withMessage('Author is required'),
  body('publishedYear')
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('Published year must be a valid year')
];

router.get('/', authenticateToken, bookController.getBooks);

router.get('/:id', authenticateToken, bookController.getBook);

router.post('/', authenticateToken, requireAdmin, bookValidation, bookController.createBook);

router.put('/:id', authenticateToken, requireAdmin, bookValidation, bookController.updateBook);

router.delete('/:id', authenticateToken, requireAdmin, bookController.deleteBook);

router.patch('/:id/status', authenticateToken, bookController.updateBookStatus);

export default router;
