import authConfig from '@config/auth';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { ICandidate } from '../domain/models/ICandidate';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';

interface IRequest {
  cpf: string;
  email: string;
  password: string;
}

interface IResponse {
  candidate: ICandidate;
  token: string;
}

@injectable()
export class CreateSessionCandidateService {
  constructor(
    @inject('CandidateRepository')
    private candidateRepository: ICandidateRepository,
  ) {}

  public async execute({ cpf, email, password }: IRequest): Promise<IResponse> {
    const candidate = await this.candidateRepository.findCandidate(cpf, email);

    if (!candidate) throw new AppError('As credenciais fornecidas estão incorretas.', 401);

    const passwordConfirmed = await compare(password, candidate.password);

    if (!passwordConfirmed) throw new AppError('As credenciais fornecidas estão incorretas.', 401);

    const token = sign({}, authConfig.jwt.secret as string, {
      subject: String(candidate.id),
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { candidate, token };
  }
}
