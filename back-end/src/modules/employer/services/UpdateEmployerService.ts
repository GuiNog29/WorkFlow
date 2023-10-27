import { UpdateResult } from 'typeorm';
import { IEmployer } from '../domain/models/IEmployer';
import { EmployerRepository } from '../infra/typeorm/repositories/EmployerRepository';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  employerId: number;
  companyName: string;
  email: string;
  password: string;
}

export class UpdateEmployerService {
  private employerRepository: EmployerRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
  }

  async execute({ employerId, companyName, email, password }: IRequest): Promise<UpdateResult> {
    const getEmployerByIdService = new GetEmployerByIdService();
    const employer = await getEmployerByIdService.execute(employerId);

    if (!employer) throw new AppError('Usuário não encontrado.');

    return await this.employerRepository.update(employerId, {
      companyName,
      email,
      password,
      cnpj: employer.cnpj,
    });
  }
}
