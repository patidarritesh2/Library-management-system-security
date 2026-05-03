import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as bookService from '../services/book.service';

export const getBooks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

export const getBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json(book);
  } catch {
    res.status(500).json({ message: 'Failed to fetch book' });
  }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { title, author, publishedYear } = req.body;

  try {
    const book = await bookService.createBook(title, author, publishedYear);
    res.status(201).json({ message: 'Book created successfully', book });
  } catch {
    res.status(500).json({ message: 'Failed to create book' });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { title, author, publishedYear } = req.body;

  try {
    const book = await bookService.updateBook(req.params.id, title, author, publishedYear);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch {
    res.status(500).json({ message: 'Failed to update book' });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await bookService.deleteBook(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Failed to delete book' });
  }
};

export const updateBookStatus = async (req: Request, res: Response): Promise<void> => {
  const { status } = req.body;

  // Validate the status value
  if (!['available', 'borrowed'].includes(status)) {
    res.status(400).json({ message: 'Status must be "available" or "borrowed"' });
    return;
  }

  try {
    const book = await bookService.updateBookStatus(req.params.id, status);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json({ message: 'Book status updated', book });
  } catch {
    res.status(500).json({ message: 'Failed to update book status' });
  }
};
