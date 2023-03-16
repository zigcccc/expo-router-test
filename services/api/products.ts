import type { ApiPageableResponse } from 'types/api';
import type { Id } from 'types/common';
import type { ProductDTO } from 'types/product';

import { api } from './base';
import {
  HttpMethod,
  ApiServiceName,
  getProvidedTagsForPageableResponse,
  serializeQueryArgsWithoutPageParam,
  getProvidedTagsForSingleEntityResponse,
  mergePageableResponse,
} from './helpers';
import { ApiTags } from './tags';

const categoriesApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getProductsForCompany: builder.query<
      ApiPageableResponse<ProductDTO>,
      { companyId: Id; page?: number; forceRefresh?: boolean }
    >({
      query: ({ companyId, page = 0 }) => ({
        url: `/products/company/${companyId}/`,
        method: HttpMethod.GET,
        params: { page },
        serviceName: ApiServiceName.CORE,
        needsAuth: false,
      }),
      providesTags: getProvidedTagsForPageableResponse(ApiTags.Products),
      serializeQueryArgs: serializeQueryArgsWithoutPageParam,
      merge: mergePageableResponse,
    }),
    getProduct: builder.query<ProductDTO, Id>({
      query: (productId) => ({
        url: `/products/${productId}/`,
        method: HttpMethod.GET,
        serviceName: ApiServiceName.CORE,
        needsAuth: false,
      }),
      providesTags: getProvidedTagsForSingleEntityResponse(ApiTags.Products),
    }),
  }),
});

export const {
  useGetProductsForCompanyQuery,
  useLazyGetProductsForCompanyQuery,
  useGetProductQuery,
  useLazyGetProductQuery,
} = categoriesApi;
