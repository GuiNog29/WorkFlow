import authConfig from '@config/auth';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Candidate } from '../entities/Candidate';
import { AppError } from '@common/exceptions/AppError';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';

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
  constructor(private candidateRepository: ICandidateRepository) {
    this.candidateRepository = candidateRepository;
  }

  public async execute({ cpf, email, password }: IRequest): Promise<IResponse> {
    const candidate = await this.candidateRepository.findCandidate(cpf, email);

    if (!candidate) throw new AppError('CNPJ/Email ou senha estão incorretos.', 401);

    const passwordConfirmed = await compare(password, candidate.password);

    if (!passwordConfirmed) throw new AppError('CNPJ/Email ou senha estão incorretos.', 401);

    const token = sign({}, authConfig.jwt.secret as string, {
      subject: String(candidate.id),
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { candidate, token };
  }
}
