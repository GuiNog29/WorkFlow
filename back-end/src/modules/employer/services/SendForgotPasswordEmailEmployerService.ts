import path from 'path';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import { inject, injectable } from 'tsyringe';
import EtheralMail from '@config/mail/EtherealMail';
import { AppError } from '@common/exceptions/AppError';
import { UserTokensRepository } from '@modules/user/repositories/UserTokensRepository';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';

interface IRequest {
  email: string;
  userType: number;
}

@injectable()
export class SendForgotPasswordEmailEmployerService {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    private userTokenRepository: UserTokensRepository,
  ) {
    this.employerRepository = employerRepository;
    this.userTokenRepository = userTokenRepository;
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
