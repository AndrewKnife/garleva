import { toErrorsObject } from '@/shared/utils/fieldErrors';
import { err, ok, ResultAsync } from '@/shared/utils/result';
import { ApiError, Response, ResponseError } from '../interfaces/api';
import { Auth } from '@/shared/interfaces/auth';
import AdvancedAbortController from '@/shared/services/advancedAbortController';

const NO_CONTENT_STATUS = 204;
const ERROR_CODE = 500;

interface Config {
  apiUrl: string;
  headers?: Record<string, string>;
  auth?: Auth;
}

const headers = {
  'Content-Type': 'application/json',
  'cache-control': 'no-cache',
  'x-apikey': 'fc68939bce2e1468f86ee7abde4022145d10c',
  key: '631da4affdc15b0265f172d2',
};

const apiUrl = '';

export const fetchApi = async <T>(
  url: string,
  params: RequestInit = {}
): ResultAsync<Response<T>, ResponseError | any> => {
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      ...params,
      headers: {
        ...headers,
      },
    });
    if (response.ok && response.status !== NO_CONTENT_STATUS) {
      const data = (await response.json()) as T;
      return ok({ status: response.status, data });
    }
    if (response.ok && response.status === NO_CONTENT_STATUS) {
      return ok({ status: response.status, data: undefined as unknown as T });
    }
    const errors = (await response.json()) as ApiError;
    return err({
      status: response.status,
      data: errors?.violations ? toErrorsObject(errors?.violations) : errors,
    });
  } catch (error) {
    return err({
      status: ERROR_CODE,
      data: {},
    });
  }
};

export const apiGet = async <T>(
  url: string,
  params = {},
  useAbortController = false
): ResultAsync<Response<T>, ResponseError> => {
  const signal = useAbortController ? AdvancedAbortController.getSignal(url) : null;
  return fetchApi(url, { ...params, method: 'GET', signal });
};

export const apiPost = async <T>(
  url: string,
  params = {}
): ResultAsync<Response<T>, ResponseError> => {
  return fetchApi(url, { ...params, method: 'POST' });
};

export const apiPut = async <T>(
  url: string,
  params = {}
): ResultAsync<Response<T>, ResponseError> => {
  return fetchApi(url, { ...params, method: 'PUT' });
};

export const apiDelete = async <T>(
  url: string,
  params = {}
): ResultAsync<Response<T>, ResponseError> => {
  return fetchApi(url, { ...params, method: 'DELETE' });
};
