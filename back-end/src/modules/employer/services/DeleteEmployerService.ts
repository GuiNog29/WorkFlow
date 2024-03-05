import { AppError } from '@common/exceptions/AppError';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { EmployerRepository } from '../repositories/EmployerRepository';

export class DeleteEmployerService {
  private employerRepository: EmployerRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
  }

  public async execute(employerId: number): Promise<Boolean> {
    const getEmployerByIdService = new GetEmployerByIdService();
    const employer = await getEmployerByIdService.execute(employerId);

    if (!employer) throw new AppError('Usuário não encontrado.');

    return await this.employerRepository.delete(employerId);
  }
}
