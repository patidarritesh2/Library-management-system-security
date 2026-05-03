import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';
import { Book } from '../models/types';

export const getAllBooks = async (): Promise<Book[]> => {
  const [rows] = await pool.execute('SELECT * FROM books ORDER BY created_at DESC') as any[];
  return rows;
};

export const getBookById = async (id: string): Promise<Book | null> => {
  const [rows] = await pool.execute(
    'SELECT * FROM books WHERE id = ?',
    [id]
  ) as any[];

  return rows[0] || null;
};

export const createBook = async (
  title: string,
  author: string,
  publishedYear: number
): Promise<Book> => {
  const id = uuidv4();

  await pool.execute(
    'INSERT INTO books (id, title, author, published_year, status) VALUES (?, ?, ?, ?, ?)',
    [id, title, author, publishedYear, 'available']
  );

  const book = await getBookById(id);
  return book!;
};

export const updateBook = async (
  id: string,
  title: string,
  author: string,
  publishedYear: number
): Promise<Book | null> => {
  const existing = await getBookById(id);
  if (!existing) return null;

  await pool.execute(
    'UPDATE books SET title = ?, author = ?, published_year = ? WHERE id = ?',
    [title, author, publishedYear, id]
  );

  return getBookById(id);
};

export const deleteBook = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute(
    'DELETE FROM books WHERE id = ?',
    [id]
  ) as any[];

  return result.affectedRows > 0;
};

export const updateBookStatus = async (
  id: string,
  status: 'available' | 'borrowed'
): Promise<Book | null> => {
  const existing = await getBookById(id);
  if (!existing) return null;

  await pool.execute(
    'UPDATE books SET status = ? WHERE id = ?',
    [status, id]
  );

  return getBookById(id);
};
