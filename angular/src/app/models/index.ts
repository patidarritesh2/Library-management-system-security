
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  status: 'available' | 'borrowed';
  published_year: number;
  created_at: string;
  updated_at: string;
}

export interface BookPayload {
  title: string;
  author: string;
  publishedYear: number;
}

export interface LoginResponse {
  token: string;
  user: User;
  message: string;
}
