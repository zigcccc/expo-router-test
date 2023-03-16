import type { ApiPageableResponse } from 'types/api';
import type { Id } from 'types/common';
import type { CompanyDTO } from 'types/company';

import { api } from './base';
import { HttpMethod, ApiServiceName } from './helpers';
import { ApiTags } from './tags';

const companiesEndpoints = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCompanies: builder.query<ApiPageableResponse<CompanyDTO>, void>({
      query: () => ({
        url: '/companies/',
        method: HttpMethod.GET,
        serviceName: ApiServiceName.CORE,
        needsAuth: false,
      }),
      providesTags: (result) => {
        const baseTag = [{ type: ApiTags.Companies, id: 'LIST' }];

        if (result) {
          return [...baseTag, ...result.content.map((company) => ({ type: ApiTags.Companies, id: company.id }))];
        }

        return baseTag;
      },
    }),
    getCompany: builder.query<CompanyDTO, Id>({
      query: (id) => ({
        url: `/companies/${id}/`,
        method: HttpMethod.GET,
        serviceName: ApiServiceName.CORE,
        needsAuth: false,
      }),
      providesTags: (result) => [{ type: ApiTags.Companies, id: result?.id || 'unknown' }],
    }),
  }),
});

export const { useGetCompaniesQuery, useGetCompanyQuery } = companiesEndpoints;
