import { Employer } from '../entities/Employer';
import { AppError } from '@shared/exceptions/AppError';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { EmployerRepository } from '../repositories/EmployerRepository';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/DiskStorageProvider';
import { S3StorageProvider } from '@shared/providers/StorageProvider/S3StorageProvider';
import upload from '@config/upload';

interface IRequest {
  employerId: string;
  fileName: string;
}

export class UpdateProfilePictureEmployerService {
  private employerRepository: EmployerRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
  }

  async execute({ employerId, fileName }: IRequest): Promise<Employer | null> {
    const getEmployerByIdService = new GetEmployerByIdService();
    const employer = await getEmployerByIdService.execute(Number(employerId));
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
