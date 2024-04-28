import path from 'path';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import { inject, injectable } from 'tsyringe';
import EtheralMail from '@config/mail/EtherealMail';
import { AppError } from '@common/exceptions/AppError';
import { UserTokensRepository } from '@modules/user/repositories/UserTokensRepository';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';
import { SendPasswordResetEmail } from '@modules/user/utils/SendPasswordResetEmail';

interface IRequest {
  email: string;
  userType: number;
}

@injectable()
export class SendForgotPasswordEmailEmployerService {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    @inject('UserTokensRepository')
    private userTokenRepository: UserTokensRepository,
  ) {}

  public async execute({ userType, email }: IRequest): Promise<void> {
    const employer = await this.employerRepository.findEmployerByEmail(email);

    if (!employer) throw new AppError('Usuário não encontrado.');

    const { token } = await this.userTokenRepository.generateToken(userType, employer.id);

    const mailService = mailConfig.driver === 'ses' ? SESMail : EtheralMail;

    await SendPasswordResetEmail(mailService, employer.companyName, employer.email, token);
  }
}
