import { Document } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
  username: string;
  password: string;
  createdAt: Date;
}

export interface INote extends Document {
  title: string;
  content: string;
  user: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  confirmPassword?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
} 