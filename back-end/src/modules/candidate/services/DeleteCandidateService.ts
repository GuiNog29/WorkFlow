import redisCache from '@common/cache/RedisCache';
import { AppError } from '@common/exceptions/AppError';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';

export class DeleteCandidateService {
  constructor(
    private candidateRepository: ICandidateRepository,
    private getCandidateByIdService: GetCandidateByIdService,
  ) {
    this.candidateRepository = candidateRepository;
    this.getCandidateByIdService = getCandidateByIdService;
  }

  async execute(candidateId: number): Promise<Boolean> {
    const candidate = await this.getCandidateByIdService.execute(candidateId);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    await redisCache.invalidate('workflow-CANDIDATES_LIST');

    return await this.candidateRepository.delete(candidateId);
  }
}
