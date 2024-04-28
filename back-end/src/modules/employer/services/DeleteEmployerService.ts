import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';

@injectable()
export class DeleteEmployerService {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    private getEmployerByIdService: GetEmployerByIdService,
  ) {}

  public async execute(employerId: number): Promise<Boolean> {
    const employer = await this.getEmployerByIdService.execute(employerId);

    if (!employer) throw new AppError('Usuário não encontrado.', 401);

    return await this.employerRepository.delete(employerId);
  }
}
