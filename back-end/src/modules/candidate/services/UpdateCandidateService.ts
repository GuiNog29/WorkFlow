import { UpdateResult } from 'typeorm';
import { CandidateRepository } from '../infra/typeorm/repositories/CandidateRepository';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  candidateId: number;
  name: string;
  email: string;
  password: string;
}

export class UpdateCandidateService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  async execute({ candidateId, name, email, password }: IRequest): Promise<UpdateResult> {
    const getCandidateByIdService = new GetCandidateByIdService();
    const candidate = await getCandidateByIdService.execute(candidateId);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    return await this.candidateRepository.update(candidateId, {
      name,
      email,
      password,
      cpf: candidate.cpf,
    });
  }
}
