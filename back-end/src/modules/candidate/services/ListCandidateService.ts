import redisCache from '@common/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { ICandidatePaginate } from '../domain/models/ICandidatePaginate';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export class ListCandidateService {
  constructor(
    @inject('CandidateRepository')
    private candidateRepository: ICandidateRepository,
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<ICandidatePaginate | null> {
    const cacheKey = `workflow-CANDIDATES_LIST_${page}_${limit}`;

    let candidates = await redisCache.recover<ICandidatePaginate>(cacheKey);

    if (!candidates) {
      const skip = (page - 1) * limit;
      candidates = await this.candidateRepository.findAll({ page, skip, take: limit });
      await redisCache.save(cacheKey, candidates);
    }

    return candidates;
  }
}
