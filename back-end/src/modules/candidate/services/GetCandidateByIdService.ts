import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { ICandidate } from '../domain/models/ICandidate';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';

@injectable()
export class GetCandidateByIdService {
  constructor(
    @inject('CandidateRepository')
    private candidateRepository: ICandidateRepository,
  ) {}

  async execute(candidateId: number): Promise<ICandidate | null> {
    const candidate = this.candidateRepository.getCandidateById(candidateId);

    if (!candidate) throw new AppError('Usuário não encontrado.', 404);

    return candidate;
  }
}
