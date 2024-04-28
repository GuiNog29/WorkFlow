import { hash } from 'bcryptjs';
import { injectable } from 'tsyringe';
import { dataSource } from '@infra/database';
import { Employer } from '../entities/Employer';
import { Repository, UpdateResult } from 'typeorm';
import { ICreateEmployer } from '../domain/models/ICreateEmployer';
import { IUpdateEmployer } from '../domain/models/IUpdateEmployer';
import { IEmployer } from '@modules/employer/domain/models/IEmployer';
import { IEmployerRepository } from './interface/IEmployerRepository';

@injectable()
export class EmployerRepository implements IEmployerRepository {
  private employerRepository: Repository<Employer>;

  constructor() {
    this.employerRepository = dataSource.getRepository(Employer);
  }

  async create({ companyName, cnpj, email, password }: ICreateEmployer): Promise<IEmployer> {
    const hashedPassword = await hash(password, 8);
    const newEmployer = this.employerRepository.create({
      companyName,
      cnpj,
      email,
      password: hashedPassword,
    });

    await this.employerRepository.save(newEmployer);
    return newEmployer;
  }

  async update(employerId: number, { companyName, email }: IUpdateEmployer): Promise<UpdateResult> {
    return await this.employerRepository.update(employerId, {
      companyName,
      email,
    });
  }

  async updateProfilePicture(employerId: number, fileName: string): Promise<IEmployer | null> {
    await this.employerRepository.update(employerId, { profile_picture: fileName });
    return this.getEmployerById(employerId);
  }

  async getEmployerById(employerId: number): Promise<IEmployer | null> {
    return await this.employerRepository.findOneBy({ id: employerId });
  }

  async delete(employerId: number): Promise<Boolean> {
    const deleteResult = await this.employerRepository.delete(employerId);
    return deleteResult.affected === 1;
  }

  async findEmployerByCnpj(cnpj: string): Promise<IEmployer | null> {
    return await this.employerRepository.findOneBy({ cnpj });
  }

  async findEmployerByEmail(email: string): Promise<IEmployer | null> {
    return await this.employerRepository.findOneBy({ email });
  }

  findEmployer(cnpj: string, email: string): Promise<IEmployer | null> {
    return this.employerRepository.findOne({
      where: [{ cnpj: cnpj }, { email: email }],
    });
  }

  async save(employer: IEmployer): Promise<void> {
    await this.employerRepository.save(employer);
  }
}
