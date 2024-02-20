import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  directory: uploadFolder,
  tempFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
};
