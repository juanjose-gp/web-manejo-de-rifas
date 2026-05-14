import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary';

export const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    return {
      folder: file.fieldname === 'sticker_images' ? 'stickers' : 'raffles',
      format: file.mimetype.split('/')[1], // jpg, png, etc
      public_id: Date.now() + '-' + file.originalname,
    };
  },
});
