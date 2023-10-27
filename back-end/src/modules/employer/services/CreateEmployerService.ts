import { IEmployer } from '../domain/models/IEmployer';
import { Employer } from '../infra/typeorm/entities/Employer';
import { EmployerRepository } from './../infra/typeorm/repositories/EmployerRepository';
import { ValidEmployerExistService } from './ValidEmployerExistService';

export class CreateEmployerService {
  private employerRepository: EmployerRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
  }

  public async execute({
    companyName,
    cnpj,
    email,
    password,
  }: IEmployer): Promise<Employer> {
    const validEmployerExistService = new ValidEmployerExistService();
    await validEmployerExistService.execute(cnpj, email );

    return await this.employerRepository.create({
      companyName,
      cnpj,
      email,
      password,
    });
  }
}
