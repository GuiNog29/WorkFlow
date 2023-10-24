import { IEmployer } from '../domain/models/IEmployer';
import { Employer } from '../infra/typeorm/entities/Employer';
import { EmployerRepository } from './../infra/typeorm/repositories/EmployerRepository';
import { UserService } from 'src/services/UserService';

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
    const userService = new UserService();
    await userService.validUserExist('employer', { cnpj, email });

    return await this.employerRepository.create({
      companyName,
      cnpj,
      email,
      password,
    });
  }
}
