import { AppError } from '@shared/errors/AppError';
import { EmployerRepository } from '../infra/typeorm/repositories/EmployerRepository';
import { GetEmployerByIdService } from './GetEmployerByIdService';

export class DeleteEmployerService {
  private employerRepository: EmployerRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
  }

  async execute(employerId: number): Promise<Boolean> {
    const getEmployerByIdService = new GetEmployerByIdService();
    const employer = await getEmployerByIdService.execute(employerId);

    if (!employer) throw new AppError('Usuário não encontrado.');

    return await this.employerRepository.delete(employerId);
  }
}
