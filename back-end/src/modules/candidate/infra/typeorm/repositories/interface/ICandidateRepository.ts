import { UpdateResult } from 'typeorm';
import { Candidate } from '../../entities/Candidate';
import { ICandidate } from '@modules/candidate/domain/models/ICandidate';

export interface ICandidateRepository {
  create({ name, email, password }: ICandidate): Promise<Candidate>;
  update(candidateId: number, { name, email, password }: ICandidate): Promise<UpdateResult>;
  getCandidateById(candidateId: number): Promise<Candidate | null>;
  delete(candidateId: number): Promise<Boolean>;
}
