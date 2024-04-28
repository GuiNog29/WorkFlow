import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { IEmployer } from '../domain/models/IEmployer';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';

@injectable()
export class GetEmployerByIdService {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
  ) {}

  async execute(employerId: number): Promise<IEmployer | null> {
    const employer = await this.employerRepository.getEmployerById(employerId);

    if (!employer) throw new AppError('Usuário não encontrado.', 404);

    return employer;
  }
}
