import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { Candidate } from '../infra/typeorm/entities/Candidate';
import { CandidateRepository } from '../infra/typeorm/repositories/CandidateRepository';

interface IRequest {
  cpf: string;
  email: string;
  password: string;
}

interface IResponse {
  candidate: Candidate;
  token: string;
}

export class CreateSessionCandidateService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  public async execute({ cpf, email, password }: IRequest): Promise<IResponse> {
    const candidate = await this.candidateRepository.findCandidate(cpf, email);

    if (!candidate) throw new AppError('CNPJ/Email ou senha estão incorretos.', 401);

    const passwordConfirmed = await compare(password, candidate.password);

    if (!passwordConfirmed) throw new AppError('CNPJ/Email ou senha estão incorretos.', 401);

    const token = sign({}, authConfig.jwt.secret, {
      subject: String(candidate.id),
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { candidate, token };
  }
}
