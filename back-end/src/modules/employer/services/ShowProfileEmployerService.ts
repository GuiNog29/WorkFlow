import { Employer } from '../entities/Employer';
import { AppError } from '@shared/exceptions/AppError';
import { EmployerRepository } from '../repositories/EmployerRepository';

interface IRequest {
  userId: string;
}

export default class ShowProfileEmployerService {
  private employerRepository: EmployerRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
  }

  public async execute({ userId }: IRequest): Promise<Employer | null> {
    const employer = this.employerRepository.getEmployerById(Number(userId));

    if (!employer) throw new AppError('Usuário não encontrado.');

    return employer;
  }
}
