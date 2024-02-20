import path from 'path';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import EtheralMail from '@config/mail/EtherealMail';
import { AppError } from '@shared/exceptions/AppError';
import { EmployerRepository } from '../repositories/EmployerRepository';
import { UserTokensRepository } from '@modules/user/repositories/UserTokensRepository';

interface IRequest {
  email: string;
  userType: number;
}

export class SendForgotPasswordEmailEmployerService {
  private employerRepository: EmployerRepository;
  private userTokenRepository: UserTokensRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
    this.userTokenRepository = new UserTokensRepository();
  }

  public async execute({ userType, email }: IRequest): Promise<void> {
    const employer = await this.employerRepository.findEmployerByEmail(email);

    if (!employer) throw new AppError('Usuário não encontrado.');

    const { token } = await this.userTokenRepository.generateToken(userType, employer.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'user',
      'views',
      'forgot_passwor.hbs',
    );

    if (mailConfig.driver === 'ses') {
      await SESMail.sendMail({
        to: {
          name: employer.companyName,
          email: employer.email,
        },
        subject: 'WorkFlow - Recuperação de Senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: employer.companyName,
            link: `${process.env.APP_WEB_URL}/resetPassword?token=${token}`,
          },
        },
      });
      return;
    }

    await EtheralMail.sendMail({
      to: {
        name: employer.companyName,
        email: employer.email,
      },
      subject: 'WorkFlow - Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: employer.companyName,
          link: `${process.env.APP_WEB_URL}/resetPassword?token=${token}`,
        },
      },
    });
  }
}
