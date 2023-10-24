import { Repository } from 'typeorm';
import { IUserRepository } from './interface/IUserRepository';
import { Employer } from '@modules/employer/infra/typeorm/entities/Employer';
import { dataSource } from '@shared/infra/typeorm';
import { Candidate } from '@modules/candidate/infra/typeorm/entities/Candidate';

export class UserRepository implements IUserRepository {
  private employerRepository: Repository<Employer>;
  private candidateRepository: Repository<Candidate>;

  constructor() {
    this.employerRepository = dataSource.getRepository(Employer);
    this.candidateRepository = dataSource.getRepository(Candidate);
  }

  findEmployerByCnpj(cnpj: string): Promise<Employer | null> {
    return this.employerRepository.findOneBy({ cnpj });
  }

  findEmployerByEmail(email: string): Promise<Employer | null> {
    return this.employerRepository.findOneBy({ email });
  }

  findCandidateByCpf(cpf: string): Promise<Candidate | null> {
    return this.candidateRepository.findOneBy({ cpf });
  }

  findCandidateByEmail(email: string): Promise<Candidate | null> {
    return this.candidateRepository.findOneBy({ email });
  }
}
