import { AppError } from '@shared/errors/AppError';
import { EmployerRepository } from '../infra/typeorm/repositories/EmployerRepository';

export class ValidEmployerExistService {
  private employerRepository: EmployerRepository;

  constructor() {
    this.employerRepository = new EmployerRepository();
  }

  public async execute(cnpj: string, email: string) {
    let existUser: any;

    existUser = await this.employerRepository.findEmployerByCnpj(cnpj);
    if (existUser) throw new AppError('CNPJ já existe.');

    existUser = await this.employerRepository.findEmployerByEmail(email);
    if (existUser) throw new AppError('E-mail já existe.');
  }
}
