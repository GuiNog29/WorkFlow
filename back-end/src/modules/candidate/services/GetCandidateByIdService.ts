import { Candidate } from '../entities/Candidate';
import { AppError } from '@shared/exceptions/AppError';
import { CandidateRepository } from '../repositories/CandidateRepository';

export class GetCandidateByIdService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  async execute(candidateId: number): Promise<Candidate | null> {
    const candidate = this.candidateRepository.getCandidateById(candidateId);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    return candidate;
  }
}
