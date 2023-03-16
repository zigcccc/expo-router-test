import type { Id } from './common';
import type { UnitOfMeasureDTO } from './unitOfMeasure';
import type { VatDTO } from './vat';

export type PriceType = 'dutyFreeAmount' | 'taxIncludedAmount';

export enum CurrencyType {
  EUR = 'EUR',
  USD = 'USD',
}

export type DeliveryPriceDTO = {
  currency: CurrencyType;
  dutyFreeAmount: number;
  taxIncludedAmount: number;
  vat: VatDTO;
};

export type ProductPriceDTO = {
  activePrice: boolean;
  currency: CurrencyType;
  dutyFreeAmount: number;
  id: Id;
  product: any;
  taxIncludedAmount: number;
  unitOfMeasure: UnitOfMeasureDTO;
  vat: VatDTO;
};

export type CartPriceDTO = {
  currency: CurrencyType;
  dutyFreeAmount: number;
  id: Id;
  taxIncludedAmount: number;
  unitOfMeasure: UnitOfMeasureDTO;
  vat: VatDTO;
};

export type OrderPriceDTO = {
  currency: CurrencyType;
  dutyFreeAmount: number;
  id: Id;
  taxIncludedAmount: number;
  unitOfMeasure: UnitOfMeasureDTO;
  vat: VatDTO;
};
