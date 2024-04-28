import { compare, hash } from 'bcryptjs';
import { AppError } from '@common/exceptions/AppError';
import { inject, injectable } from 'tsyringe';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';
import { IEmployer } from '../domain/models/IEmployer';

interface IRequest {
  userId: number;
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
  ) {}

  public async execute({
    userId,
    companyName,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<IEmployer | null> {
    const employer = await this.getEmployerByIdService.execute(Number(userId));

    if (!employer) throw new AppError('Usuário não encontrado.');

    if (email !== employer.email && (await this.employerRepository.findEmployerByEmail(email)))
    throw new AppError('Este e-mail já foi cadastrado.');

    if (password) {
      if (!oldPassword) throw new AppError('Senha antiga deve ser preenchida.');

      if (!(await compare(oldPassword, employer.password)))
        throw new AppError('Senha antiga não confere.');

        employer.password = await hash(password, 8);
    }

    employer.companyName = companyName;
    employer.email = email;

    await this.employerRepository.save(employer);

    return employer;
  }
}
