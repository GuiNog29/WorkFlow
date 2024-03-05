import redisCache  from '@shared/cache/RedisCache';
import { Candidate } from '../entities/Candidate';
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
    await validCandidateExistService.execute(cpf, email);
    await redisCache.invalidate('workflow-CANDIDATES_LIST');
    return await this.candidateRepository.create({ name, cpf, email, password });
  }
}
