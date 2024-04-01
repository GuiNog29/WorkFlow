import { UpdateResult } from 'typeorm';
import { IEmployer } from '@modules/employer/domain/models/IEmployer';
import { IUpdateEmployer } from '@modules/employer/domain/models/IUpdateEmployer';
import { ICreateEmployer } from '@modules/employer/domain/models/ICreateEmployer';

export interface IEmployerRepository {
  create({ companyName, cnpj, email, password }: ICreateEmployer): Promise<IEmployer>;
  update(employerId: number, { companyName, email }: IUpdateEmployer): Promise<UpdateResult>;
  getEmployerById(employerId: number): Promise<IEmployer | null>;
  delete(employerId: number): Promise<Boolean>;
  findEmployer(cnpj: string, email: string): Promise<IEmployer | null>;
  findEmployerByCnpj(cnpj: string): Promise<IEmployer | null>;
  findEmployerByEmail(email: string): Promise<IEmployer | null>;
  save(employer: IEmployer): Promise<void>;
  updateProfilePicture(employerId: number, fileName: string): Promise<IEmployer | null>;
}
