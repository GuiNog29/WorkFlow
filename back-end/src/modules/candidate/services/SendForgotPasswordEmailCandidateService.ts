import path from 'path';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import { inject, injectable } from 'tsyringe';
import EtheralMail from '@config/mail/EtherealMail';
import { AppError } from '@common/exceptions/AppError';
import { SendPasswordResetEmail } from '@modules/user/utils/SendPasswordResetEmail';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';
import { IUserTokensRepository } from '@modules/user/repositories/interface/IUserTokensRepository';

interface IRequest {
  email: string;
  userType: number;
}

@injectable()
export class SendForgotPasswordEmailCandidateService {
  constructor(
    @inject('CandidateRepository')
    private candidateRepository: ICandidateRepository,
    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository,
  ) {}

  public async execute({ userType, email }: IRequest): Promise<void> {
    const candidate = await this.candidateRepository.findCandidateByEmail(email);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    const { token } = await this.userTokenRepository.generateToken(userType, candidate.id);

    const mailService = mailConfig.driver === 'ses' ? SESMail : EtheralMail;

    await SendPasswordResetEmail(mailService, candidate.name, candidate.email, token);
  }
}
