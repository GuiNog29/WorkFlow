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

  public async execute({ userType, email }: IRequest) : Promise<void> {
    const employer = await this.employerRepository.findEmployerByEmail(email);

    if (!employer) throw new AppError('Usuário não encontrado.');

    const token = await this.userTokenRepository.generateToken(userType, employer.id);

    console.log(token);

    await EtheralMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${token?.token}`
    })
  }
}
