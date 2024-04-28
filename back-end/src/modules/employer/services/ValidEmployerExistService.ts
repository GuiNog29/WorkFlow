import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { EmployerRepository } from '../repositories/EmployerRepository';

@injectable()
export class ValidEmployerExistService {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: EmployerRepository,
  ) {}

  public async execute(cnpj: string, email: string) {
    const existCpfUser = await this.employerRepository.findEmployerByCnpj(cnpj);
    if (existCpfUser) throw new AppError('CNPJ já existe.');

    const existEmailUser = await this.employerRepository.findEmployerByEmail(email);
    if (existEmailUser) throw new AppError('E-mail já existe.');
  }
}
