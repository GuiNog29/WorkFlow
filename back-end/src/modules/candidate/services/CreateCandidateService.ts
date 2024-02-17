import { Candidate } from '../entities/Candidate';
import RedisCache from '@shared/cache/RedisCache';
import { ICandidate } from '../domain/models/ICandidate';
import { ValidCandidateExistService } from './ValidCandidateExistService';
import { CandidateRepository } from '../repositories/CandidateRepository';

export class CreateCandidateService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  public async execute({ name, cpf, email, password }: ICandidate): Promise<Candidate> {
    const validCandidateExistService = new ValidCandidateExistService();
    const redisCache = new RedisCache();
    await validCandidateExistService.execute(cpf, email);
    await redisCache.invalidate('workflow-CANDIDATES_LIST');
    return await this.candidateRepository.create({ name, cpf, email, password });
  }
}
