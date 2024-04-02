import redisCache from '@common/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';

@injectable()
export class DeleteCandidateService {
  constructor(
    @inject('CandidateRepository')
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
