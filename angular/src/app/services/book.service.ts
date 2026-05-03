import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book, BookPayload } from '../models';

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  createBook(payload: BookPayload): Observable<{ message: string; book: Book }> {
    return this.http.post<{ message: string; book: Book }>(this.apiUrl, payload);
  }

  updateBook(id: string, payload: BookPayload): Observable<{ message: string; book: Book }> {
    return this.http.put<{ message: string; book: Book }>(`${this.apiUrl}/${id}`, payload);
  }

  deleteBook(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, status: 'available' | 'borrowed'): Observable<{ message: string; book: Book }> {
    return this.http.patch<{ message: string; book: Book }>(`${this.apiUrl}/${id}/status`, { status });
  }
}
