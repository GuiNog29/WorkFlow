import { Candidate } from '@modules/candidate/infra/typeorm/entities/Candidate';
import { Employer } from '@modules/employer/infra/typeorm/entities/Employer';

export interface IUserRepository {
  findEmployerByCnpj(cnpj: string): Promise<Employer | null>;
  findEmployerByEmail(email: string): Promise<Employer | null>;
  findCandidateByCpf(cpf: string): Promise<Candidate | null>;
  findCandidateByEmail(email: string): Promise<Candidate | null>;
}
