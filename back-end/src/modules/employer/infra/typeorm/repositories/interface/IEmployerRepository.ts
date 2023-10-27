import { UpdateResult } from 'typeorm';
import { Employer } from '../../entities/Employer';
import { IEmployer } from '@modules/employer/domain/models/IEmployer';

export interface IEmployerRepository {
  create({ companyName, cnpj, email, password }: IEmployer): Promise<Employer>;
  update(employerId: number, { companyName, email }: IEmployer): Promise<UpdateResult>;
  getEmployerById(employerId: number): Promise<Employer | null>;
  delete(employerId: number): Promise<Boolean>;
  findEmployerByCnpj(cnpj: string): Promise<Employer | null>;
  findEmployerByEmail(email: string): Promise<Employer | null>;
}
