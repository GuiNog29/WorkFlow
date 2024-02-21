import { AppError } from '@shared/exceptions/AppError';
import { RedisCache } from '@shared/cache/RedisCache';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { CandidateRepository } from '../repositories/CandidateRepository';

export class DeleteCandidateService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  async execute(candidateId: number): Promise<Boolean> {
    const getCandidateByIdService = new GetCandidateByIdService();
    const redisCache = new RedisCache();
    const candidate = await getCandidateByIdService.execute(candidateId);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    await redisCache.invalidate('workflow-CANDIDATES_LIST');

    return await this.candidateRepository.delete(candidateId);
  }
}
