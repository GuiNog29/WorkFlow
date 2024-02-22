import { RedisCache } from '@shared/cache/RedisCache';
import { ICandidatePaginate } from '../domain/models/ICandidatePaginate';
import { CandidateRepository } from '../repositories/CandidateRepository';

interface SearchParams {
  page: number;
  limit: number;
}

export class ListCandidateService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  public async execute({ page, limit }: SearchParams): Promise<ICandidatePaginate | null> {
    const redisCache = new RedisCache();
    const take = limit;
    const skip = (Number(page) - 1) * take;

    let candidates: ICandidatePaginate | null = await redisCache.recover<ICandidatePaginate>(
      'workflow-CANDIDATES_LIST',
    );

    if (!candidates) {
      const candidatesData = await this.candidateRepository.findAll({ page, skip, take });
      if (candidatesData) {
        candidates = candidatesData;
        await redisCache.save('workflow-CANDIDATES_LIST', candidatesData);
      }
    }

    return candidates;
  }
}
