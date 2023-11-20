import { AppError } from '@shared/errors/AppError';
import { EmployerRepository } from '@modules/employer/infra/typeorm/repositories/EmployerRepository';
import { UserTokensRepository } from '@modules/user/infra/typeorm/repositories/UserTokensRepository';

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
  }
}
