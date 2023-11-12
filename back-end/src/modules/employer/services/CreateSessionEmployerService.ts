import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
import { Employer } from '../infra/typeorm/entities/Employer';
import { EmployerRepository } from '../infra/typeorm/repositories/EmployerRepository';

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

    const token = sign({}, '205c7146083ebf9c29e5df6f5000df57', {
      subject: String(employer.id),
      expiresIn: '1d',
    });

    return { employer, token };
  }
}
