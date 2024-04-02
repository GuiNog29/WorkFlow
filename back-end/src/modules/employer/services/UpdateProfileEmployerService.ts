import { compare, hash } from 'bcryptjs';
import { AppError } from '@common/exceptions/AppError';
import { inject, injectable } from 'tsyringe';
import { Employer } from '../entities/Employer';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';

interface IRequest {
  userId: string;
  companyName: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
export default class UpdateProfileCandidateService {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    private getEmployerByIdService: GetEmployerByIdService,
  ) {
    this.employerRepository = employerRepository;
    this.getEmployerByIdService = getEmployerByIdService;
  }

  public async execute({
    userId,
    companyName,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<Employer | null> {
    const employer = await this.getEmployerByIdService.execute(Number(userId));

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

    await this.employerRepository.save(employer);

    return employer;
  }
}
