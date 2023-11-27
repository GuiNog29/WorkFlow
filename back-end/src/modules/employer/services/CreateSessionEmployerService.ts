import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { Employer } from '../entities/Employer';
import { AppError } from '@shared/exceptions/AppError';
import { EmployerRepository } from '../repositories/EmployerRepository';

interface IRequest {
  cnpj: string;
  email: string;
  password: string;
}

interface IResponse {
  employer: Employer;
  token: string;
}

export class CreateSessionEmployerService {
  private employerRepository: EmployerRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
  }

  public async execute({ cnpj, email, password }: IRequest): Promise<IResponse> {
    const employer = await this.employerRepository.findEmployer(cnpj, email);

    if (!employer) throw new AppError('CNPJ/Email ou senha estão incorretos.', 401);

    const passwordConfirmed = await compare(password, employer.password);

    if (!passwordConfirmed) throw new AppError('CNPJ/Email ou senha estão incorretos.', 401);

    const token = sign({}, authConfig.jwt.secret, {
      subject: String(employer.id),
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { employer, token };
  }
}
