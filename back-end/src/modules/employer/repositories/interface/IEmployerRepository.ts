import { UpdateResult } from 'typeorm';
import { IEmployer } from '@modules/employer/domain/models/IEmployer';

export interface IEmployerRepository {
  create({ companyName, cnpj, email, password }: IEmployer): Promise<IEmployer>;
  update(employerId: number, { companyName, email }: IEmployer): Promise<UpdateResult>;
  getEmployerById(employerId: number): Promise<IEmployer | null>;
  delete(employerId: number): Promise<Boolean>;
  findEmployer(cnpj: string, email: string): Promise<IEmployer | null>;
  findEmployerByCnpj(cnpj: string): Promise<IEmployer | null>;
  findEmployerByEmail(email: string): Promise<IEmployer | null>;
  updateProfilePicture(employerId: number, fileName: string): Promise<IEmployer | null>;
}
