import { UpdateResult } from 'typeorm';
import { EmployerRepository } from '../infra/typeorm/repositories/EmployerRepository';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { AppError } from '@shared/errors/AppError';
import { ValidEmployerDataService } from './ValidEmployerDataService';

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

  public async execute(
    employerId: number,
    { companyName, email }: IRequest,
  ): Promise<UpdateResult> {
    const getEmployerByIdService = new GetEmployerByIdService();
    const validEmployerDataService = new ValidEmployerDataService();

    await validEmployerDataService.execute(companyName, email);
    const employer = await getEmployerByIdService.execute(employerId);
    if (!employer) throw new AppError('Usuário não encontrado.');

    return await this.employerRepository.update(employerId, {
      companyName,
      email,
      password: employer.password,
      cnpj: employer.cnpj,
    });
  }
}
