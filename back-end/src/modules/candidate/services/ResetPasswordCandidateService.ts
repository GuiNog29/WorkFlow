import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';
import { IUserTokensRepository } from '@modules/user/repositories/interface/IUserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordCandidateService {
  constructor(
    @inject('CandidateRepository')
    private candidateRepository: ICandidateRepository,
    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('Token não encontrado.');

    const candidate = await this.candidateRepository.getCandidateById(userToken.userId);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    const tokenExpiration = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), tokenExpiration)) throw new AppError('Token expirado.');

    candidate.password = await hash(password, 8);

    await this.candidateRepository.save(candidate);
    await this.userTokenRepository.invalidateToken(token);
  }
}
