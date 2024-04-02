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
  ) {
    this.candidateRepository = candidateRepository;
    this.validCandidateExistService = validCandidateExistService;
  }

  public async execute({ name, cpf, email, password }: ICreateCandidate): Promise<ICandidate> {
    await this.validCandidateExistService.execute(cpf, email);
    await redisCache.invalidate('workflow-CANDIDATES_LIST');
    return await this.candidateRepository.create({ name, cpf, email, password });
  }
}
