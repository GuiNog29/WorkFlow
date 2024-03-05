import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { AppError } from '@common/exceptions/AppError';
import { CandidateRepository } from '../repositories/CandidateRepository';
import { UserTokensRepository } from '@modules/user/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordCandidateService {
  private candidateRepository: CandidateRepository;
  private userTokenRepository: UserTokensRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
    this.userTokenRepository = new UserTokensRepository();
  }

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('Token não encontrado.');

    const candidate = await this.candidateRepository.getCandidateById(userToken.userId);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    const compareDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expirado.');

    candidate.password = await hash(password, 8);
  }
}
