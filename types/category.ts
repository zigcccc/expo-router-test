import type { Id } from './common';

export type CategoryDTO = {
  categoryName: string;
  code: string;
  id: Id;
  importance: number;
  productCount: number;
};
