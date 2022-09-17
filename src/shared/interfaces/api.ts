import { ResultAsync } from '@/shared/utils/result';

export interface FieldError {
  propertyPath: string;
  message: string;
  code: string;
}

export interface ApiError {
  '@context': string;
  '@type': string;
  'hydra:description': string;
  'hydra:title': string;
  violations: FieldError[];
}

export interface Response<T> {
  status: number;
  data: T;
}

export type ViolationErrorMap = Record<string, FieldError>;
export type ResponseError = Response<ViolationErrorMap>;

export interface IApi {
  fetch<T>(url: string, params?: RequestInit): ResultAsync<Response<T>, ResponseError>;
  get<T>(url: string, params?: RequestInit): ResultAsync<Response<T>, ResponseError>;
  post<T>(url: string, params?: RequestInit): ResultAsync<Response<T>, ResponseError>;
  put<T>(url: string, params?: RequestInit): ResultAsync<Response<T>, ResponseError>;
  delete<T>(url: string, params?: RequestInit): ResultAsync<Response<T>, ResponseError>;
}
