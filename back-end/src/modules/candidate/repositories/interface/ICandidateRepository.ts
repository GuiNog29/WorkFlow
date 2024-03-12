import { UpdateResult } from 'typeorm';
import { ICandidate } from '@modules/candidate/domain/models/ICandidate';
import { ICandidatePaginate } from '@modules/candidate/domain/models/ICandidatePaginate';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICandidateRepository {
  create({ name, email, password }: ICandidate): Promise<ICandidate>;
  update(candidateId: number, { name, email, password }: ICandidate): Promise<UpdateResult>;
  getCandidateById(candidateId: number): Promise<ICandidate | null>;
  delete(candidateId: number): Promise<Boolean>;
  findCandidateByCpf(cpf: string): Promise<ICandidate | null>;
  findCandidateByEmail(email: string): Promise<ICandidate | null>;
  findAll({ page, skip, take }: SearchParams): Promise<ICandidatePaginate>;
  save(candidate: ICandidate): Promise<void>;
}
