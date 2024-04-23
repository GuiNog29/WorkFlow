import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import uploadConfig from '@config/upload';
import { AppError } from '@common/exceptions/AppError';

export class S3StorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    if (!fs.existsSync(originalPath)) throw new AppError('Arquivo não encontrado');

    const contentType = mime.lookup(originalPath);

    if (!contentType) throw new AppError('Tipo de arquivo não suportado');

    const fileContent = await fs.promises.readFile(originalPath);

    const putObjectCommand = new PutObjectCommand({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: contentType,
    });

    await this.client.send(putObjectCommand);

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
    });

    await this.client.send(deleteObjectCommand);
  }
}
