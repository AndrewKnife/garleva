import { ResultAsync } from '../utils/result';
import { Response, ResponseError } from './api';
import { ApiAuth } from '@/shared/interfaces/api/ApiAuth';

export interface Auth {
  isAuthenticated(): boolean;
  getAuthToken(): string;
  refresh(): ResultAsync<Response<ApiAuth>, ResponseError>;
  logout(): void;
}
