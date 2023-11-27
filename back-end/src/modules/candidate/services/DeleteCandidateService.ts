import { AppError } from '@shared/exceptions/AppError';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { CandidateRepository } from '../repositories/CandidateRepository';

export class DeleteCandidateService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  async execute(candidateId: number): Promise<Boolean> {
    const getCandidateByIdService = new GetCandidateByIdService();
    const candidate = await getCandidateByIdService.execute(candidateId);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    return await this.candidateRepository.delete(candidateId);
  }
}
