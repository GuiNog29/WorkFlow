import { AppError } from '@shared/errors/AppError';
import { Candidate } from '../infra/typeorm/entities/Candidate';
import { CandidateRepository } from '../infra/typeorm/repositories/CandidateRepository';

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
