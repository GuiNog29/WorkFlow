import { hash } from 'bcryptjs';
import { dataSource } from '@infra/database';
import { Candidate } from '../entities/Candidate';
import { Repository, UpdateResult } from 'typeorm';
import { ICandidateRepository, SearchParams } from './interface/ICandidateRepository';
import { ICandidate } from '@modules/candidate/domain/models/ICandidate';
import { ICandidatePaginate } from '../domain/models/ICandidatePaginate';
import { ICreateCandidate } from '../domain/models/ICreateCandidate';

export class CandidateRepository implements ICandidateRepository {
  constructor(private candidateRepository: Repository<Candidate>) {
    this.candidateRepository = dataSource.getRepository(Candidate);
  }

  async create({ name, cpf, email, password }: ICreateCandidate): Promise<ICandidate> {
    const hashedPassword = await hash(password, 8);
    const newCandidate = this.candidateRepository.create({
      name,
      cpf,
      email,
      password: hashedPassword,
    });

    await this.candidateRepository.save(newCandidate);
    return newCandidate;
  }

  async update(candidateId: number, { name, email, password }: ICandidate): Promise<UpdateResult> {
    return await this.candidateRepository.update(candidateId, { name, email, password });
  }

  async updateProfilePicture(candidateId: number, fileName: string): Promise<ICandidate | null> {
    await this.candidateRepository.update(candidateId, { profile_picture: fileName })
    return this.getCandidateById(candidateId);
  }

  async getCandidateById(candidateId: number): Promise<ICandidate | null> {
    return await this.candidateRepository.findOneBy({ id: candidateId });
  }

  async delete(candidateId: number): Promise<Boolean> {
    const deleteResult = await this.candidateRepository.delete(candidateId);
    return deleteResult.affected === 1;
  }

  async findAll({ page, skip, take }: SearchParams): Promise<ICandidatePaginate> {
    const [candidates, count] = await this.candidateRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: candidates,
    };

    return result;
  }

  async findCandidateByCpf(cpf: string): Promise<ICandidate | null> {
    return await this.candidateRepository.findOneBy({ cpf });
  }

  async findCandidateByEmail(email: string): Promise<ICandidate | null> {
    return await this.candidateRepository.findOneBy({ email });
  }

  async findCandidate(cpf: string, email: string): Promise<ICandidate | null> {
    return this.candidateRepository.findOne({
      where: [{ cpf: cpf }, { email: email }],
    });
  }

  async save(candidate: Candidate): Promise<void>{
    await this.candidateRepository.save(candidate);
  }
}
