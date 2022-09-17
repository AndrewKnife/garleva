import { ResultAsync } from '../utils/result';
import { Response, ResponseError } from './api';
import { ApiAuth } from '@/shared/interfaces/api/ApiAuth';
import { LoginForm } from '@/shared/interfaces/forms/LoginForm';

export interface Auth {
  isAuthenticated(): boolean;
  getAuthToken(): string;
  login(data: LoginForm): ResultAsync<Response<ApiAuth>, ResponseError>;
  refresh(): ResultAsync<Response<ApiAuth>, ResponseError>;
  logout(): void;
}
