import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQuery } from './helpers';
import { ApiTags } from './tags';

export const api = createApi({
  reducerPath: 'expoRouterApi',
  baseQuery: fetchBaseQuery,
  tagTypes: Object.values(ApiTags),
  endpoints: () => ({}),
});
