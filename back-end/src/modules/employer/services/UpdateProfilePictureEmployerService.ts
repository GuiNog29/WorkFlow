import upload from '@config/upload';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { IEmployer } from '../domain/models/IEmployer';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';
import { S3StorageProvider } from '@common/providers/StorageProvider/S3StorageProvider';
import { DiskStorageProvider } from '@common/providers/StorageProvider/DiskStorageProvider';
import { IStorageProvider } from '@common/providers/StorageProvider/interface/IStorageProvider';

interface IRequest {
  employerId: string;
  fileName: string;
}

@injectable()
export class UpdateProfilePictureEmployerService {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    private getEmployerByIdService: GetEmployerByIdService,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ employerId, fileName }: IRequest): Promise<IEmployer | null> {
    const employer = await this.getEmployerByIdService.execute(Number(employerId));

    if (!employer) throw new AppError('Usuário não encontrado.');

    if (employer.profile_picture) await this.storageProvider.deleteFile(employer.profile_picture);

    const profilePicFileName = await this.storageProvider.saveFile(fileName);

    return await this.employerRepository.updateProfilePicture(
      Number(employerId),
      profilePicFileName,
    );
  }
}
