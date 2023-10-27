import { Repository, UpdateResult } from 'typeorm';
import { Employer } from '../entities/Employer';
import { dataSource } from '@shared/infra/typeorm';
import { IEmployer } from '@modules/employer/domain/models/IEmployer';
import { IEmployerRepository } from './interface/IEmployerRepository';

export class EmployerRepository implements IEmployerRepository {
  private employerRepository: Repository<Employer>;

  constructor() {
    this.employerRepository = dataSource.getRepository(Employer);
  }

  async create({ companyName, cnpj, email, password }: IEmployer): Promise<Employer> {
    const newEmployer = this.employerRepository.create({
      companyName,
      cnpj,
      email,
      password,
    });

    await this.employerRepository.save(newEmployer);
    return newEmployer;
  }

  async update(
    employerId: number,
    { companyName, email, password }: IEmployer,
  ): Promise<UpdateResult> {
    return await this.employerRepository.update(employerId, {
      companyName,
      email,
      password
    });
  }

  async getEmployerById(employerId: number): Promise<Employer | null> {
    return await this.employerRepository.findOneBy({ id: employerId });
  }

  async delete(employerId: number): Promise<Boolean> {
    const deleteResult = await this.employerRepository.delete(employerId);
    return deleteResult.affected === 1;
  }

  findEmployerByCnpj(cnpj: string): Promise<Employer | null> {
    return this.employerRepository.findOneBy({ cnpj });
  }

  findEmployerByEmail(email: string): Promise<Employer | null> {
    return this.employerRepository.findOneBy({ email });
  }
}
