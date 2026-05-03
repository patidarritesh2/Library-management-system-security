
export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  created_at: Date;
  updated_at: Date;
}

export interface UserPublic {
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
  created_at: Date;
  updated_at: Date;
}

export interface JwtPayload {
  userId: string;
  username: string;
  role: 'admin' | 'user';
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
