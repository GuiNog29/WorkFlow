import { AppError } from '@shared/errors/AppError';
import { Employer } from '../infra/typeorm/entities/Employer';
import { EmployerRepository } from '../infra/typeorm/repositories/EmployerRepository';

export class GetEmployerByIdService {
  private employerRepository: EmployerRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
  }

  public async execute(employerId: number): Promise<Employer | null> {
    const employer = this.employerRepository.getEmployerById(employerId);

    if (!employer) throw new AppError('Usuário não encontrado.');

    return employer;
  }
}
