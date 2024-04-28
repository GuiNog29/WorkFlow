import redisCache from '@common/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { ICandidate } from '../domain/models/ICandidate';
import { ICreateCandidate } from '../domain/models/ICreateCandidate';
import { ValidCandidateExistService } from './ValidCandidateExistService';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';

@injectable()
export class CreateCandidateService {
  constructor(
    @inject('CandidateRepository')
    private candidateRepository: ICandidateRepository,
    private validCandidateExistService: ValidCandidateExistService,
  ) {}

  public async execute(candidateData: ICreateCandidate): Promise<ICandidate> {
    const { cpf, email } = candidateData;
    await this.validCandidateExistService.execute(cpf, email);
    await redisCache.invalidate('workflow-CANDIDATES_LIST');
    return this.candidateRepository.create(candidateData);
  }
}
