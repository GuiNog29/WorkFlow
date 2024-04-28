import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import uploadConfig from '@config/upload';
import { AppError } from '@common/exceptions/AppError';
import { IStorageProvider } from './interface/IStorageProvider';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

export class S3StorageProvider implements IStorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath).catch(() => {
      throw new AppError('Erro ao ler o arquivo.');
    });

    const contentType = mime.lookup(originalPath) || 'application/octet-stream';

    const putObjectCommand = new PutObjectCommand({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: contentType,
    });

    await this.client.send(putObjectCommand).catch(() => {
      throw new AppError('Erro ao enviar arquivo para o S3.');
    });

    await fs.promises.unlink(originalPath).catch(() => {
      throw new AppError('Erro ao deletar arquivo local.');
    });

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
