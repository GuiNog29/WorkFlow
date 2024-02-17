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

  public async execute({ page, limit }: SearchParams): Promise<ICandidatePaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const candidates = this.candidateRepository.findAll({ page, skip, take });
    return candidates;
  }
}
