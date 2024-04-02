import path from 'path';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import { inject, injectable } from 'tsyringe';
import EtheralMail from '@config/mail/EtherealMail';
import { AppError } from '@common/exceptions/AppError';
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
  ) {
    this.candidateRepository = candidateRepository;
    this.userTokenRepository = userTokenRepository;
  }

  public async execute({ userType, email }: IRequest): Promise<void> {
    const candidate = await this.candidateRepository.findCandidateByEmail(email);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    const { token } = await this.userTokenRepository.generateToken(userType, candidate.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'user',
      'views',
      'forgot_password.hbs',
    );

    if (mailConfig.driver === 'ses') {
      await SESMail.sendMail({
        to: {
          name: candidate.name,
          email: candidate.email,
        },
        subject: 'WorkFlow - Recuperação de Senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: candidate.name,
            link: `${process.env.APP_WEB_URL}/resetPassword?token=${token}`,
          },
        },
      });
      return;
    }

    await EtheralMail.sendMail({
      to: {
        name: candidate.name,
        email: candidate.email,
      },
      subject: 'WorkFlow - Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: candidate.name,
          link: `${process.env.APP_WEB_URL}/resetPassword?token=${token}`,
        },
      },
    });
  }
}
