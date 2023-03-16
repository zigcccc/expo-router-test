import { Id } from './common';

export type ApiPayload = {
  data: any;
  status: number;
};

export type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

export type Pageable = {
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  unpaged: boolean;
  paged: true;
};

export type ApiError = {
  timestamp: string | number;
  status: number;
  error: string;
  message?: string;
  path: string;
};

export type ApiErrorResponse = {
  data: ApiError;
  status: number;
  statusText: string;
};

export type GenericEntity = {
  id: Id;
  [x: string]: unknown;
};

export type ApiPageableResponse<T> = {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  sort: Sort;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
};
