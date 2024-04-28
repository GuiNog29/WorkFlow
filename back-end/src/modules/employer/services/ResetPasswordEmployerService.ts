import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';
import { UserTokensRepository } from '@modules/user/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordEmployerService {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    @inject('UserTokensRepository')
    private userTokenRepository: UserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('Token não encontrado.');

    const employer = await this.employerRepository.getEmployerById(userToken.userId);

    if (!employer) throw new AppError('Usuário não encontrado.');

    const tokenExpiration = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), tokenExpiration)) throw new AppError('Token expirado.');

    employer.password = await hash(password, 8);

    await this.employerRepository.save(employer);
    await this.userTokenRepository.invalidateToken(token);
  }
}
