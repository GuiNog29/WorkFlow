import { AppError } from '@common/exceptions/AppError';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';

export class DeleteEmployerService {
  constructor(
    private employerRepository: IEmployerRepository,
    private getEmployerByIdService: GetEmployerByIdService,
  ) {
    this.employerRepository = employerRepository;
    this.getEmployerByIdService = getEmployerByIdService;
  }

  public async execute(employerId: number): Promise<Boolean> {
    const employer = await this.getEmployerByIdService.execute(employerId);

    if (!employer) throw new AppError('Usuário não encontrado.');

    return await this.employerRepository.delete(employerId);
  }
}
