import { Employer } from '../entities/Employer';
import { AppError } from '@common/exceptions/AppError';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { EmployerRepository } from '../repositories/EmployerRepository';
import { DiskStorageProvider } from '@common/providers/StorageProvider/DiskStorageProvider';
import upload from '@config/upload';
import { inject, injectable } from 'tsyringe';
import { S3StorageProvider } from '@common/providers/StorageProvider/S3StorageProvider';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';

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
  ) {
    this.employerRepository = employerRepository;
    this.getEmployerByIdService = getEmployerByIdService;
  }

  async execute({ employerId, fileName }: IRequest): Promise<Employer | null> {
    const employer = await this.getEmployerByIdService.execute(Number(employerId));
    let profilePicFileName = '';

    if (!employer) throw new AppError('Usuário não encontrado.');

    if (upload.driver === 's3') {
      const s3Provider = new S3StorageProvider();

      if (employer.profile_picture) await s3Provider.deleteFile(employer.profile_picture);

      let profilePicFileName = await s3Provider.saveFile(fileName);
    } else {
      const diskProvider = new DiskStorageProvider();

      if (employer.profile_picture) await diskProvider.deleteFile(employer.profile_picture);

      let profilePicFileName = await diskProvider.saveFile(fileName);
    }

    return await this.employerRepository.updateProfilePicture(
      Number(employerId),
      profilePicFileName,
    );
  }
}
