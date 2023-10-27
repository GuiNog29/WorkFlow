import { Repository, UpdateResult } from 'typeorm';
import { Candidate } from '../entities/Candidate';
import { ICandidateRepository } from './interface/ICandidateRepository';
import { ICandidate } from '@modules/candidate/domain/models/ICandidate';
import { dataSource } from '@shared/infra/typeorm';

export class CandidateRepository implements ICandidateRepository {
  private candidateRepository: Repository<Candidate>;

  constructor() {
    this.candidateRepository = dataSource.getRepository(Candidate);
  }

  async create({ name, cpf, email, password }: ICandidate): Promise<Candidate> {
    const newCandidate = this.candidateRepository.create({
      name,
      cpf,
      email,
      password,
    });

    await this.candidateRepository.save(newCandidate);
    return newCandidate;
  }

  async update(candidateId: number, { name, email, password }: ICandidate): Promise<UpdateResult> {
    return await this.candidateRepository.update(candidateId, { name, email, password });
  }

  async getCandidateById(candidateId: number): Promise<Candidate | null> {
    return await this.candidateRepository.findOneBy({ id: candidateId });
  }

  async delete(candidateId: number): Promise<Boolean> {
    const deleteResult = await this.candidateRepository.delete(candidateId);
    return deleteResult.affected === 1;
  }

  async findCandidateByCpf(cpf: string): Promise<Candidate | null> {
    return await this.candidateRepository.findOneBy({ cpf });
  }

  async findCandidateByEmail(email: string): Promise<Candidate | null> {
    return await this.candidateRepository.findOneBy({ email });
  }
}
