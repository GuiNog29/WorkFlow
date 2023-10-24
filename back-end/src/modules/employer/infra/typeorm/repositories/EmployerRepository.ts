import { Repository } from 'typeorm';
import { Employer } from '../entities/Employer';
import { dataSource } from '@shared/infra/typeorm';
import { IEmployer } from '@modules/employer/domain/models/IEmployer';
import { IEmployerRepository } from './interface/IEmployerRepository';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';

export class EmployerRepository implements IEmployerRepository {
  private employerRepository: Repository<Employer>;

  constructor() {
    this.employerRepository = dataSource.getRepository(Employer);
  }

  async create({
    companyName,
    cnpj,
    email,
    password,
  }: IEmployer): Promise<Employer> {
    const newEmployer = this.employerRepository.create({
      companyName,
      cnpj,
      email,
      password,
    });

    await this.employerRepository.save(newEmployer);
    return newEmployer;
  }
}
