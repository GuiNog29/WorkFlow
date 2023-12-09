import { compare, hash } from 'bcryptjs';
import { AppError } from '@shared/exceptions/AppError';
import { EmployerRepository } from '../repositories/EmployerRepository';
import { Employer } from '../entities/Employer';
import { GetEmployerByIdService } from './GetEmployerByIdService';

interface IRequest {
  userId: string;
  companyName: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

export default class UpdateProfileCandidateService {
  private employerRepository: EmployerRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
  }

  public async execute({
    userId,
    companyName,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<Employer | null> {
    const getEmployerByIdService = new GetEmployerByIdService();
    const employer = await getEmployerByIdService.execute(Number(userId));

    if (!employer) throw new AppError('Usuário não encontrado.');

    const employerEmail = await this.employerRepository.findEmployerByEmail(email);

    if (employerEmail && employerEmail.id !== Number(userId))
      throw new AppError('Este e-mail já foi cadastrado.');

    if (password && !oldPassword) throw new AppError('Senha antiga deve ser preenchida.');

    if (password && oldPassword) {
      const verifyOldPassword = await compare(oldPassword, employer.password);

      if (!verifyOldPassword) throw new AppError('Senha antiga não confere.');

      employer.password = await hash(password, 8);
    }

    employer.companyName = companyName;
    employer.email = email;

    return employer;
  }
}
