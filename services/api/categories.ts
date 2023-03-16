import type { CategoryDTO } from 'types/category';
import type { Id } from 'types/common';

import { api } from './base';
import { HttpMethod, ApiServiceName } from './helpers';
import { ApiTags } from './tags';

const categories = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCategoriesForCompany: builder.query<CategoryDTO[], Id>({
      query: (companyId) => ({
        url: `/categories/company/${companyId}/`,
        method: HttpMethod.GET,
        serviceName: ApiServiceName.CORE,
        needsAuth: false,
      }),
      providesTags: (result) => {
        const baseTag = { type: ApiTags.Categories, id: 'LIST' };

        if (result) {
          return [baseTag, ...result.map((category) => ({ type: ApiTags.Categories, id: category.id }))];
        }

        return [baseTag];
      },
    }),
    getCategory: builder.query<CategoryDTO, Id>({
      query: (categoryId) => ({
        url: `/categories/${categoryId}/`,
        method: HttpMethod.GET,
        serviceName: ApiServiceName.CORE,
        needsAuth: false,
      }),
      providesTags: (result) => [{ type: ApiTags.Categories, id: result?.id }],
    }),
  }),
});

export const { useGetCategoriesForCompanyQuery, useGetCategoryQuery } = categories;
