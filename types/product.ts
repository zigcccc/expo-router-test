import type { CategoryDTO } from './category';
import type { CompanyDTO } from './company';
import type { ImageDTO } from './image';
import type { ProductPriceDTO } from './price';
import type { ProducerDTO } from './producer';

export type ProductDTO = {
  active: boolean;
  adultConsent: boolean;
  id: number;
  category: CategoryDTO;
  company: CompanyDTO;
  images: ImageDTO[];
  origin: string;
  producer: ProducerDTO;
  productDescription: string;
  productName: string;
  productPrice: ProductPriceDTO;
};
