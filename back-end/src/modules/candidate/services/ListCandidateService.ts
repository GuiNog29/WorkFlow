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
  ) {
    this.candidateRepository = candidateRepository;
  }

  public async execute({ page, limit }: SearchParams): Promise<ICandidatePaginate | null> {
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
