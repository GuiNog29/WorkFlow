import { Employer } from '../../entities/Employer';
import { IEmployer } from '@modules/employer/domain/models/IEmployer';

export interface IEmployerRepository {
  create({
    companyName,
    cnpj,
    email,
    password,
  }: IEmployer): Promise<Employer>;
}
