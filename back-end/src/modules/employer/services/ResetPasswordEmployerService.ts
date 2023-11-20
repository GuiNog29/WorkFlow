import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { AppError } from '@shared/errors/AppError';
import { EmployerRepository } from '@modules/employer/infra/typeorm/repositories/EmployerRepository';
import { UserTokensRepository } from '@modules/user/infra/typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordEmployerService {
  private employerRepository: EmployerRepository;
  private userTokenRepository: UserTokensRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
    this.userTokenRepository = new UserTokensRepository();
  }

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('Token não encontrado.');

    const employer = await this.employerRepository.getEmployerById(userToken.userId);

    if (!employer) throw new AppError('Usuário não encontrado.');

    const compareDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expirado.');

    employer.password = await hash(password, 8);
  }
}
