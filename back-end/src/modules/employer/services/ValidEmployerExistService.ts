import { AppError } from '@common/exceptions/AppError';
import { EmployerRepository } from '../repositories/EmployerRepository';

export class ValidEmployerExistService {
  constructor(private employerRepository: EmployerRepository) {
    this.employerRepository = employerRepository;
  }

  public async execute(cnpj: string, email: string) {
    let existUser: any;

    existUser = await this.employerRepository.findEmployerByCnpj(cnpj);
    if (existUser) throw new AppError('CNPJ já existe.');

    existUser = await this.employerRepository.findEmployerByEmail(email);
    if (existUser) throw new AppError('E-mail já existe.');
  }
}
