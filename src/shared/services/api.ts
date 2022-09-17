import { toErrorsObject } from '@/shared/utils/fieldErrors';
import { err, ok, ResultAsync } from '@/shared/utils/result';
import { ApiError, IApi, Response, ResponseError } from '../interfaces/api';
import { Logger } from './logger';
import { DataQueryParams, PaginatedResource } from '@/shared/interfaces/pagination';
import { GenericResponse } from '@/shared/interfaces/genericResponse';
import { getAllPageCount } from '@/shared/utils/apiUtils';
import { Auth } from '@/shared/interfaces/auth';
import { RESPONSE_DATA_KEY, RESPONSE_TOTAL_ITEMS_KEY } from '@/shared/constants/apiLinks';
import AdvancedAbortController from '@/shared/services/advancedAbortController';

const NO_CONTENT_STATUS = 204;
const ERROR_CODE = 500;
const DEFAULT_PAGE_SIZE = 20;

interface Config {
  apiUrl: string;
  headers?: Record<string, string>;
  auth?: Auth;
}

export class Api implements IApi {
  config: Config;

  headers: Record<string, string>;

  logger: Logger;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
    this.headers = {
      'Content-Type': 'application/json',
      // Removes api platform fields from response
      // Accept: 'application/json',
    };
  }

  async fetch<T>(
    url: string,
    params: RequestInit = {}
  ): ResultAsync<Response<T>, ResponseError | any> {
    try {
      const { auth, apiUrl } = this.config;
      if (auth && !auth.isAuthenticated()) {
        await auth.refresh();
      }
      const response = await fetch(`${apiUrl}${url}`, {
        ...params,
        headers: {
          ...(this.config.headers ?? this.headers),
          ...(auth ? { Authorization: `Bearer ${auth?.getAuthToken()}` } : {}),
          ...(params.headers ?? {}),
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
      this.logger.error('Error fetching url', errors, {
        status: response?.status,
        response,
        url,
        params,
      });
      return err({
        status: response.status,
        data: errors?.violations ? toErrorsObject(errors?.violations) : errors,
      });
    } catch (error) {
      if (!params.signal?.aborted) {
        this.logger.error('Failed to fetch', error, { url, params });
      }
      // Fetch only throws this on network errors
      return err({
        status: ERROR_CODE,
        data: {},
      });
    }
  }

  get<T>(
    url: string,
    params = {},
    useAbortController = false
  ): ResultAsync<Response<T>, ResponseError> {
    const signal = useAbortController ? AdvancedAbortController.getSignal(url) : null;
    return this.fetch(url, { ...params, method: 'GET', signal });
  }

  post<T>(url: string, params = {}): ResultAsync<Response<T>, ResponseError> {
    return this.fetch(url, { ...params, method: 'POST' });
  }

  put<T>(url: string, params = {}): ResultAsync<Response<T>, ResponseError> {
    return this.fetch(url, { ...params, method: 'PUT' });
  }

  delete<T>(url: string, params = {}): ResultAsync<Response<T>, ResponseError> {
    return this.fetch(url, { ...params, method: 'DELETE' });
  }

  async getPaginatedResource<T>(
    apiLink: (params: URLSearchParams) => string,
    options: DataQueryParams,
    useAbortController = false
  ): Promise<PaginatedResource<T>> {
    const limit = options.limit ?? DEFAULT_PAGE_SIZE;
    const params = new URLSearchParams({
      ...options,
      ...(options.search && { [options.searchKey ?? 'name']: options.search ?? '' }),
      page: options.page.toString(),
      limit: limit.toString(),
    });

    const response = await this.get<GenericResponse<T>>(apiLink(params), {}, useAbortController);

    const result: PaginatedResource<T> = {
      page: options.page,
      pageCount: 1,
      totalCount: 0,
      items: [],
    };
    if (response.isErr()) {
      return result;
    }

    const { data } = response.value;
    result.pageCount = getAllPageCount(data);
    result.totalCount = data[RESPONSE_TOTAL_ITEMS_KEY];
    result.items = data[RESPONSE_DATA_KEY];

    return result;
  }
}
