import { BaseQueryFn, defaultSerializeQueryArgs } from '@reduxjs/toolkit/dist/query';
import { SerializeQueryArgs } from '@reduxjs/toolkit/dist/query/defaultSerializeQueryArgs';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';

import { ApiPageableResponse, GenericEntity } from 'types/api';

import { ApiTags } from './tags';

type FetchMeta = {
  status?: number;
};

/**
 * Enum with API versions
 * @enum {string} ApiServiceName
 */
export enum ApiVersion {
  V1 = 'v1',
}

/**
 * Enum with SVC microservices names
 * @enum {string} ApiServiceName
 */
export enum ApiServiceName {
  CORE = 'coreManagement',
  ORDER = 'orderManagement',
  PARTY = 'partyManagement',
  PAYMENT = 'paymentManagement',
}

/**
 * Enum containing API Content Types
 * @enum {string} ApiContentType
 */
export enum ApiContentType {
  JSON = 'application/json',
  JSON_PATCH = 'application/json-patch+json',
}

/**
 * Enum containing supported API Http Methods
 */
export enum HttpMethod {
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  POST = 'POST',
  PATCH = 'PATCH',
}

type GetUrlForApiServiceOptions = {
  apiVersion?: ApiVersion;
  needsAuth?: boolean;
  serviceName?: ApiServiceName;
  endpoint: string;
};

export const shouldAddTrailingSlashToSegment = (segment: string): boolean => {
  // We add the traling slash to each path segment
  // if it does not have one already. We do not want to add
  // trailing slash if the segment ends with .json suffix (static controller).
  // We alse don't want to add trailing slash if URL contains query params (includes ?)
  return !segment.endsWith('/') && !segment.endsWith('.json') && !segment.includes('?');
};

export const getJoinedPath = (...segments: string[]): string => {
  return segments.reduce((acc, segment) => {
    if (shouldAddTrailingSlashToSegment(segment)) {
      segment += '/';
    }

    if (segment.startsWith('/')) {
      // If path segments starts with slash, we remove it
      // to avoid duplicated slashed on join
      segment = segment.substr(1);
    }

    return acc + segment;
  }, '/');
};

export const getUrlForApiService = ({
  apiVersion = ApiVersion.V1,
  needsAuth,
  serviceName = ApiServiceName.CORE,
  endpoint,
}: GetUrlForApiServiceOptions): string => {
  const segments = [serviceName, apiVersion, endpoint];

  // If we don't need auth, we want to add /public/ segment between API version and the endpoint
  if (!needsAuth) {
    // We want to insert into zero-based position 2 (after apiVersion, before endpoint), delete zero elements, and add 'public' as the segment value
    segments.splice(2, 0, 'public');
  }

  // We join the path with all of the segments
  return getJoinedPath(...segments);
};

const client: AxiosInstance = axios.create({
  baseURL: 'https://api.test.ofb2c.optifarm.net',
  headers: {
    // @ts-ignore
    common: {
      'Content-Type': 'application/json',
    },
  },
});

export type FetchApiResponse<T = any> = {
  isSuccess: boolean;
  data?: T;
  errorData?: AxiosError | string;
  status?: number;
};

export type FetchApiProps = {
  apiVersion?: ApiVersion;
  accessToken?: string;
  data?: any;
  contentType?: ApiContentType;
  params?: Record<string, unknown>;
  method?: HttpMethod;
  needsAuth?: boolean;
  serviceName?: ApiServiceName;
  url: string;
};

const fetchApi = async ({
  apiVersion = ApiVersion.V1,
  accessToken,
  contentType = ApiContentType.JSON,
  url: endpoint,
  method = HttpMethod.GET,
  data: reqData,
  params,
  needsAuth = false,
  serviceName = ApiServiceName.CORE,
}: FetchApiProps): Promise<FetchApiResponse> => {
  try {
    if (needsAuth) {
      if (accessToken) {
        client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      } else {
        return { errorData: 'Not authenticated', isSuccess: false, status: 401 };
      }
    } else {
      delete client.defaults.headers.common['Authorization'];
    }

    const dataOrParams = [HttpMethod.GET, HttpMethod.DELETE].includes(method) ? 'params' : 'data';

    const options: AxiosRequestConfig = {
      url: getUrlForApiService({ apiVersion, needsAuth, serviceName, endpoint }),
      method,
      headers: {
        'content-type': contentType,
      },
    };

    if (reqData) {
      options[dataOrParams] = reqData;
    }

    if (params) {
      options.params = { ...options.params, ...params };
    }

    const { data, status } = await client.request(options);
    return { data, isSuccess: true, status };
  } catch (err: any) {
    const status = err.response?.status;
    return { errorData: err.response, isSuccess: false, status };
  }
};

export const getErrorDataFromApiResponse = ({ errorData }: FetchApiResponse) => {
  if (!errorData) {
    return 'Error';
  }

  if (typeof errorData === 'string') {
    return errorData;
  }

  if (typeof errorData === 'object' && 'response' in errorData) {
    return errorData.response.data || errorData.response.statusText || 'Error';
  }

  return 'Error';
};

export const fetchBaseQuery: BaseQueryFn<FetchApiProps, unknown, unknown, Record<string, unknown>, FetchMeta> = async (
  params
) => {
  try {
    const response = await fetchApi(params);

    if (!response.isSuccess) {
      return {
        error: getErrorDataFromApiResponse(response),
        meta: {
          status: response.status,
        },
      };
    }

    return {
      data: response.data,
      meta: {
        status: response.status,
      },
    };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: err.response?.data || err.message || 'Error',
      meta: {
        status: err.response?.status || 500,
      },
    };
  }
};

export const getProvidedTagsForPageableResponse =
  (tag: ApiTags) =>
  <R extends ApiPageableResponse<GenericEntity>>(result: R) => {
    const baseTag = { type: tag, id: 'LIST' };

    if (result) {
      return [baseTag, ...result.content.map((item) => ({ type: tag, id: item.id }))];
    }

    return [baseTag];
  };

export const getProvidedTagsForSingleEntityResponse =
  (tag: ApiTags) =>
  <R extends GenericEntity>(result: R) => {
    return result ? [{ type: tag, id: result.id }] : [{ type: tag, id: 'DETAIL' }];
  };

export const serializeQueryArgsWithoutPageParam: SerializeQueryArgs<any> = ({
  queryArgs,
  endpointDefinition,
  endpointName,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page: _, forceRefresh: __, ...rest } = queryArgs;
  return defaultSerializeQueryArgs({ queryArgs: rest, endpointDefinition, endpointName });
};

export const mergePageableResponse = <T extends ApiPageableResponse<GenericEntity>>(
  currentData: T,
  newData: T,
  { arg }: { arg: { forceRefresh?: boolean } }
): T => {
  if (!currentData || currentData.pageable.pageNumber === newData.pageable.pageNumber || arg.forceRefresh) {
    return newData;
  }

  if (currentData.pageable.pageNumber > newData.pageable.pageNumber) {
    return currentData;
  }

  return { ...newData, content: [...currentData.content, ...newData.content] };
};
