import { Candidate } from '../entities/Candidate';
import { AppError } from '@shared/exceptions/AppError';
import { CandidateRepository } from '../repositories/CandidateRepository';

interface IRequest {
  userId: string;
}

export default class ShowProfileEmployerService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  public async execute({ userId }: IRequest): Promise<Candidate | null> {
    const candidate = this.candidateRepository.getCandidateById(Number(userId));

    if (!candidate) throw new AppError('Usuário não encontrado.');

    return candidate;
  }
}
