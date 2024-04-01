import { UpdateResult } from 'typeorm';
import { AppError } from '@common/exceptions/AppError';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { ValidEmployerDataService } from './ValidEmployerDataService';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';

interface IRequest {
  companyName: string;
  email: string;
}

export class UpdateEmployerService {
  constructor(
    private employerRepository: IEmployerRepository,
    private getEmployerByIdService: GetEmployerByIdService,
    private validEmployerDataService: ValidEmployerDataService,
  ) {
    this.employerRepository = employerRepository;
    this.getEmployerByIdService = getEmployerByIdService;
    this.validEmployerDataService = validEmployerDataService;
  }

  public async execute(
    employerId: number,
    { companyName, email }: IRequest,
  ): Promise<UpdateResult> {
    await this.validEmployerDataService.execute(companyName, email);
    const employer = await this.getEmployerByIdService.execute(employerId);

    if (!employer) throw new AppError('Usuário não encontrado.');

    return await this.employerRepository.update(employerId, {
      companyName,
      email,
      password: employer.password,
      cnpj: employer.cnpj,
    });
  }
}
