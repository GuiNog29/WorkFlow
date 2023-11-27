import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import { Employer } from '../entities/Employer';
import { AppError } from '@shared/exceptions/AppError';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { EmployerRepository } from '../repositories/EmployerRepository';

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

    if (!employer) throw new AppError('Usuário não encontrado.');

    if (employer.profile_picture) {
      const employerProfilePicturePath = path.join(
        uploadConfig.directory,
        employer.profile_picture,
      );

      const employerProfilePictureExists = await fs.promises.stat(employerProfilePicturePath);

      if (employerProfilePictureExists) await fs.promises.unlink(employerProfilePicturePath);
    }

    return await this.employerRepository.updateProfilePicture(Number(employerId), fileName);
  }
}
