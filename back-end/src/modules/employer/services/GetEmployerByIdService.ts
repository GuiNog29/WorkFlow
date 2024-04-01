import { AppError } from '@common/exceptions/AppError';
import { IEmployer } from '../domain/models/IEmployer';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';

export class GetEmployerByIdService {
  constructor(private employerRepository: IEmployerRepository) {
    this.employerRepository = employerRepository;
  }

  public async execute(employerId: number): Promise<IEmployer | null> {
    const employer = await this.employerRepository.getEmployerById(employerId);

    if (!employer) throw new AppError('Usuário não encontrado.');

    return employer;
  }
}
