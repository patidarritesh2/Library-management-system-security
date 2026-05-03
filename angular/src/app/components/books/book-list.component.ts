import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Book, BookPayload } from '../../models';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showModal = false;
  isEditMode = false;
  selectedBookId = '';
  formTitle = '';
  formAuthor = '';
  formYear: number = new Date().getFullYear();
  formError = '';

  constructor(
    public bookService: BookService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load books.';
        this.isLoading = false;
      }
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.formTitle = '';
    this.formAuthor = '';
    this.formYear = new Date().getFullYear();
    this.formError = '';
    this.showModal = true;
  }

  openEditModal(book: Book): void {
    this.isEditMode = true;
    this.selectedBookId = book.id;
    this.formTitle = book.title;
    this.formAuthor = book.author;
    this.formYear = book.published_year;
    this.formError = '';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveBook(): void {
    if (!this.formTitle || !this.formAuthor || !this.formYear) {
      this.formError = 'All fields are required';
      return;
    }

    const payload: BookPayload = {
      title: this.formTitle,
      author: this.formAuthor,
      publishedYear: this.formYear
    };

    if (this.isEditMode) {
      this.bookService.updateBook(this.selectedBookId, payload).subscribe({
        next: () => {
          this.showModal = false;
          this.showSuccess('Book updated successfully');
          this.loadBooks();
        },
        error: (err) => this.formError = err.error?.message || 'Failed to update'
      });
    } else {
      this.bookService.createBook(payload).subscribe({
        next: () => {
          this.showModal = false;
          this.showSuccess('Book added successfully');
          this.loadBooks();
        },
        error: (err) => this.formError = err.error?.message || 'Failed to create'
      });
    }
  }

  deleteBook(id: string): void {
    if (!confirm('Are you sure you want to delete this book?')) return;

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter(b => b.id !== id); // remove from local array
        this.showSuccess('Book deleted');
      },
      error: () => this.errorMessage = 'Failed to delete book'
    });
  }

  toggleStatus(book: Book): void {
    const newStatus = book.status === 'available' ? 'borrowed' : 'available';
    const action = newStatus === 'borrowed' ? 'borrow' : 'return';

    if (!confirm(`Do you want to ${action} "${book.title}"?`)) return;

    this.bookService.updateStatus(book.id, newStatus).subscribe({
      next: (res) => {
        const index = this.books.findIndex(b => b.id === book.id);
        if (index !== -1) this.books[index] = res.book;
        this.showSuccess(`Book ${action}ed successfully`);
      },
      error: () => this.errorMessage = 'Failed to update status'
    });
  }

  private showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 3000);
  }
}
