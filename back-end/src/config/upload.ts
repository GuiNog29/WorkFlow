import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

[uploadFolder, tmpFolder].forEach(folder => {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
});

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
        callback(null, fileName);
      },
    }),
  },
  config: {
    aws: {
      bucket: process.env.AWS_BUCKET_NAME || 'api-workflow',
    },
  },
} as IUploadConfig;
