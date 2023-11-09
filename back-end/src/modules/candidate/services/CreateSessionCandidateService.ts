import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { CandidateRepository } from '../infra/typeorm/repositories/CandidateRepository';
import { Candidate } from '../infra/typeorm/entities/Candidate';

interface IRequest {
  cpf: string;
  email: string;
  password: string;
}

export class CreateSessionCandidateService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  public async execute({ cpf, email, password }: IRequest): Promise<Candidate> {
    const candidate = await this.candidateRepository.findCandidate(cpf, email);

    if (!candidate) throw new AppError('CNPJ/Email ou senha estão incorretos.', 401);

    const passwordConfirmed = await compare(password, candidate.password);

    if (!passwordConfirmed) throw new AppError('CNPJ/Email ou senha estão incorretos.', 401);

    return candidate;
  }
}
