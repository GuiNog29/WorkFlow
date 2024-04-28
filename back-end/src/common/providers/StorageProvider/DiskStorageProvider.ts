import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import { IStorageProvider } from './interface/IStorageProvider';

export class DiskStorageProvider implements IStorageProvider {
  private getFullPath(file: string): string {
    return path.resolve(uploadConfig.directory, file);
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);
    const targetPath = this.getFullPath(file);

    await fs.promises.rename(originalPath, targetPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = this.getFullPath(file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
