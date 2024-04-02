import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import { Employer } from '../entities/Employer';
import { AppError } from '@common/exceptions/AppError';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';

interface IRequest {
  cnpj: string;
  email: string;
  password: string;
}

interface IResponse {
  employer: Employer;
  token: string;
}

@injectable()
export class CreateSessionEmployerService {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
  ) {
    this.employerRepository = employerRepository;
  }

  public async execute({ cnpj, email, password }: IRequest): Promise<IResponse> {
    const employer = await this.employerRepository.findEmployer(cnpj, email);

    if (!employer) throw new AppError('CNPJ/Email ou senha estão incorretos.', 401);

    const passwordConfirmed = await compare(password, employer.password);

    if (!passwordConfirmed) throw new AppError('CNPJ/Email ou senha estão incorretos.', 401);

    const token = sign({}, authConfig.jwt.secret as string, {
      subject: String(employer.id),
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { employer, token };
  }
}
