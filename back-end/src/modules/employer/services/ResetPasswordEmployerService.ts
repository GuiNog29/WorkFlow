import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { AppError } from '@common/exceptions/AppError';
import { UserTokensRepository } from '@modules/user/repositories/UserTokensRepository';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordEmployerService {
  constructor(
    private employerRepository: IEmployerRepository,
    private userTokenRepository: UserTokensRepository,
  ) {
    this.employerRepository = employerRepository;
    this.userTokenRepository = userTokenRepository;
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
