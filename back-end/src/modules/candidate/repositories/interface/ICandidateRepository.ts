import { UpdateResult } from 'typeorm';
import { Candidate } from '@modules/candidate/entities/Candidate';
import { ICandidate } from '@modules/candidate/domain/models/ICandidate';
import { ICandidatePaginate } from '@modules/candidate/domain/models/ICandidatePaginate';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICandidateRepository {
  create({ name, email, password }: ICandidate): Promise<Candidate>;
  update(candidateId: number, { name, email, password }: ICandidate): Promise<UpdateResult>;
  getCandidateById(candidateId: number): Promise<Candidate | null>;
  delete(candidateId: number): Promise<Boolean>;
  findCandidateByCpf(cpf: string): Promise<Candidate | null>;
  findCandidateByEmail(email: string): Promise<Candidate | null>;
  findCpfOrEmail(cpf: string, email: string): Promise<Candidate | null>;
  findAll({ page, skip, take }: SearchParams): Promise<ICandidatePaginate>;
  save(candidate: Candidate): Promise<void>;
}
