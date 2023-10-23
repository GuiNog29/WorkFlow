import { IEmployer } from '../domain/models/IEmployer';
import { Employer } from '../infra/typeorm/entities/Employer';
import { EmployerRepository } from './../infra/typeorm/repositories/EmployerRepository';

export class CreateEmployerService {
  private employerRepository: EmployerRepository

  constructor(){
    this.employerRepository = new EmployerRepository();
  }

  public async execute({
    companyName,
    cnpj,
    email,
    password,
  }: IEmployer): Promise<Employer> {
    return await this.employerRepository.create({
      companyName,
      cnpj,
      email,
      password,
    });
  }
}
