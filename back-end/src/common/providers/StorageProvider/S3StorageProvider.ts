import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import { AppError } from '@common/exceptions/AppError';

export class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    if (!fs.existsSync(originalPath)) throw new AppError('Arquivo não encontrado');

    const contentType = mime.lookup(originalPath);

    if (!contentType) throw new AppError('Tipo de arquivo não suportado');

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
