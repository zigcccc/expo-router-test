import type { ImageDTO } from './image';
import type { MediumCharacteristicDTO } from './mediumCharacteristic';

type OrganizationStatusType = 'INITIALIZED' | 'VALIDATED' | 'CLOSED';

export enum CompanyOfferingType {
  SINGLE = 'SINGLE',
  GROUP = 'GROUP',
}

export type CompanyDeliveryPriceModel = {
  freeLocalDeliveryThreshold: number;
  localDeliveryPrice: number;
  freeRegionalDeliveryThreshold: number;
  regionalDeliveryPrice: number;
  minHomeDeliveryThreshold: number;
};

export type CompanyDTO = CompanyDeliveryPriceModel & {
  address: string;
  companyName: string;
  email: string;
  id: number;
  image: ImageDTO;
  importance: number;
  isHeadOffice: boolean;
  isLegalEntity: boolean;
  mediumCharacteristics: MediumCharacteristicDTO[];
  organizationStatusType: OrganizationStatusType | null;
  offeringType: CompanyOfferingType;
  postCode: string;
  postName: string;
  validDelivery: boolean;
  validPickupPoint: boolean;
};
