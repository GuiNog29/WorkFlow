import { UpdateResult } from 'typeorm';
import { ICandidate } from '@modules/candidate/domain/models/ICandidate';
import { ICandidatePaginate } from '@modules/candidate/domain/models/ICandidatePaginate';
import { ICreateCandidate } from '@modules/candidate/domain/models/ICreateCandidate';
import { IUpdateCandidate } from '@modules/candidate/domain/models/IUpdateCandidate';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICandidateRepository {
  create({ name, cpf, email, password }: ICreateCandidate): Promise<ICandidate>;
  update(candidateId: number, { name, email }: IUpdateCandidate): Promise<UpdateResult>;
  getCandidateById(candidateId: number): Promise<ICandidate | null>;
  delete(candidateId: number): Promise<Boolean>;
  findCandidate(cpf?: string, email?: string): Promise<ICandidate | null>;
  findCandidateByCpf(cpf: string): Promise<ICandidate | null>;
  findCandidateByEmail(email: string): Promise<ICandidate | null>;
  findAll({ page, skip, take }: SearchParams): Promise<ICandidatePaginate>;
  save(candidate: ICandidate): Promise<void>;
  updateProfilePicture(candidateId: number, fileName: string): Promise<ICandidate | null>;
}
