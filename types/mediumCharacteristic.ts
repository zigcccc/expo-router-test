type MediumContactType = 'PHONE_NUMBER' | 'POSTAL_CODE' | 'EMAIL_ADDRESS';
type SocialNetworkType = 'FACEBOOK' | 'TWITTER' | 'INSTAGRAM' | 'LINKED_IN';

export type MediumCharacteristicDTO = {
  city: string;
  companies: Array<any>;
  contactType: MediumContactType;
  country: string;
  contryCode: string;
  emailAddress: string;
  faxNumber: string;
  id: number;
  phoneNumber: string;
  postCode: string;
  socialNetworkId: string;
  socialNetworkType: SocialNetworkType;
  stateOrProvince: string;
  street1: string;
  street2: string;
};
