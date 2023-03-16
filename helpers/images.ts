import { ImageDTO } from 'types/image';

export const getImageDownloadUri = (image: ImageDTO) => {
  return `https://api.test.ofb2c.optifarm.net/coreManagement/public${image.downloadUri}`;
};
