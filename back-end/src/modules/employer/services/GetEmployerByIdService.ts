import { AppError } from '@shared/exceptions/AppError';
import { Employer } from '../entities/Employer';
import { EmployerRepository } from '../repositories/EmployerRepository';

export class GetEmployerByIdService {
  private employerRepository: EmployerRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
  }

  public async execute(employerId: number): Promise<Employer | null> {
    const employer = await this.employerRepository.getEmployerById(employerId);

    if (!employer) throw new AppError('Usuário não encontrado.');

    return employer;
  }
}
