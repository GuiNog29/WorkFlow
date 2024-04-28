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
  private ormRepository: Repository<Employer>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Employer);
  }

  async create(employerData: ICreateEmployer): Promise<IEmployer> {
    const hashedPassword = await hash(employerData.password, 8);
    const newEmployer = this.ormRepository.create({
      ...employerData,
      password: hashedPassword,
    });

    await this.ormRepository.save(newEmployer);
    return newEmployer;
  }

  async update(employerId: number, employerData: IUpdateEmployer): Promise<UpdateResult> {
    return this.ormRepository.update(employerId, employerData);
  }

  async updateProfilePicture(employerId: number, fileName: string): Promise<IEmployer | null> {
    await this.ormRepository.update(employerId, { profile_picture: fileName });
    return this.getEmployerById(employerId);
  }

  async getEmployerById(employerId: number): Promise<IEmployer | null> {
    return await this.ormRepository.findOneBy({ id: employerId });
  }

  async delete(employerId: number): Promise<Boolean> {
    const deleteResult = await this.ormRepository.delete(employerId);
    return deleteResult.affected === 1;
  }

  async findEmployerByCnpj(cnpj: string): Promise<IEmployer | null> {
    return await this.ormRepository.findOneBy({ cnpj });
  }

  async findEmployerByEmail(email: string): Promise<IEmployer | null> {
    return await this.ormRepository.findOneBy({ email });
  }

  findEmployer(cnpj: string, email: string): Promise<IEmployer | null> {
    return this.ormRepository.findOne({
      where: [{ cnpj: cnpj }, { email: email }],
    });
  }

  async save(employer: IEmployer): Promise<void> {
    await this.ormRepository.save(employer);
  }
}
