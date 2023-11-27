import { UpdateResult } from 'typeorm';
import { AppError } from '@shared/exceptions/AppError';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { ValidCandidateDataService } from './ValidCandidateDataService';
import { CandidateRepository } from '../repositories/CandidateRepository';

interface IRequest {
  name: string;
  email: string;
}

export class UpdateCandidateService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  async execute(candidateId: number, { name, email }: IRequest): Promise<UpdateResult> {
    const getCandidateByIdService = new GetCandidateByIdService();
    const validCandidateDataService = new ValidCandidateDataService();

    await validCandidateDataService.execute(name, email);
    const candidate = await getCandidateByIdService.execute(candidateId);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    return await this.candidateRepository.update(candidateId, {
      name,
      email,
      password: candidate.password,
      cpf: candidate.cpf,
    });
  }
}
