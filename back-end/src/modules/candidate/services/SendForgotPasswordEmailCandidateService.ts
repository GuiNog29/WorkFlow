import path from 'path';
import EtheralMail from '@config/mail/EtherealMail';
import { AppError } from '@shared/exceptions/AppError';
import { CandidateRepository } from '../repositories/CandidateRepository';
import { UserTokensRepository } from '@modules/user/repositories/UserTokensRepository';

interface IRequest {
  email: string;
  userType: number;
}

export class SendForgotPasswordEmailCandidateService {
  private candidateRepository: CandidateRepository;
  private userTokenRepository: UserTokensRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
    this.userTokenRepository = new UserTokensRepository();
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
