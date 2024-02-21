import { Employer } from '../entities/Employer';
import { AppError } from '@shared/exceptions/AppError';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { EmployerRepository } from '../repositories/EmployerRepository';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/DiskStorageProvider';

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
    const storageProvider = new DiskStorageProvider();
    const employer = await getEmployerByIdService.execute(Number(employerId));

    if (!employer) throw new AppError('Usuário não encontrado.');

    if (employer.profile_picture) {
      await storageProvider.deleteFile(fileName);
    }

    const profilePicFileName = await storageProvider.saveFile(fileName);

    return await this.employerRepository.updateProfilePicture(
      Number(employerId),
      profilePicFileName,
    );
  }
}
