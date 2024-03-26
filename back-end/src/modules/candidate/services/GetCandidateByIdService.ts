import { Candidate } from '../entities/Candidate';
import { AppError } from '@common/exceptions/AppError';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';

export class GetCandidateByIdService {
  constructor(private candidateRepository: ICandidateRepository) {
    this.candidateRepository = candidateRepository;
  }

  async execute(candidateId: number): Promise<Candidate | null> {
    const candidate = this.candidateRepository.getCandidateById(candidateId);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    return candidate;
  }
}
