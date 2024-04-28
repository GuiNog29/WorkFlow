import { hash } from 'bcryptjs';
import { injectable } from 'tsyringe';
import { dataSource } from '@infra/database';
import { Candidate } from '../entities/Candidate';
import { Repository, UpdateResult } from 'typeorm';
import { ICreateCandidate } from '../domain/models/ICreateCandidate';
import { IUpdateCandidate } from '../domain/models/IUpdateCandidate';
import { ICandidate } from '@modules/candidate/domain/models/ICandidate';
import { ICandidatePaginate } from '../domain/models/ICandidatePaginate';
import { ICandidateRepository, SearchParams } from './interface/ICandidateRepository';

@injectable()
export class CandidateRepository implements ICandidateRepository {
  private ormRepository: Repository<Candidate>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Candidate);
  }

  async create(candidateData: ICreateCandidate): Promise<ICandidate> {
    const hashedPassword = await hash(candidateData.password, 8);

    const candidate = this.ormRepository.create({
      ...candidateData,
      password: hashedPassword,
    });

    await this.ormRepository.save(candidate);
    return candidate;
  }

  async update(candidateId: number, candidadeData: IUpdateCandidate): Promise<UpdateResult> {
    return this.ormRepository.update(candidateId, candidadeData);
  }

  async updateProfilePicture(candidateId: number, fileName: string): Promise<ICandidate | null> {
    await this.ormRepository.update(candidateId, { profile_picture: fileName });
    return this.getCandidateById(candidateId);
  }

  async getCandidateById(candidateId: number): Promise<ICandidate | null> {
    return await this.ormRepository.findOneBy({ id: candidateId });
  }

  async delete(candidateId: number): Promise<Boolean> {
    const deleteResult = await this.ormRepository.delete(candidateId);
    return deleteResult.affected === 1;
  }

  async findAll({ page, skip, take }: SearchParams): Promise<ICandidatePaginate> {
    const [candidates, count] = await this.ormRepository.findAndCount({
      skip,
      take,
    });

    return {
      per_page: take,
      total: count,
      current_page: page,
      data: candidates,
    };
  }

  async findCandidateByCpf(cpf: string): Promise<ICandidate | null> {
    return await this.ormRepository.findOneBy({ cpf });
  }

  async findCandidateByEmail(email: string): Promise<ICandidate | null> {
    return await this.ormRepository.findOneBy({ email });
  }

  async findCandidate(cpf: string, email: string): Promise<ICandidate | null> {
    return this.ormRepository.findOne({
      where: [{ cpf: cpf }, { email: email }],
    });
  }

  async save(candidate: ICandidate): Promise<void> {
    await this.ormRepository.save(candidate);
  }
}
