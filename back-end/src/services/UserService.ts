import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async validUserExist(
    userType: 'employer' | 'candidate',
    data: any,
  ) {
    let existUser: any;

    if (userType === 'employer') {
      existUser = await this.userRepository.findEmployerByCnpj(data.cnpj);
      if (existUser) throw new AppError('CNPJ já existe.');

      existUser = await this.userRepository.findEmployerByEmail(data.email);
      if (existUser) throw new AppError('E-mail já existe.');

    } else if (userType === 'candidate') {
      existUser = await this.userRepository.findCandidateByCpf(data.cpf);
      if (existUser) throw new AppError('CPF já existe.');

      existUser = await this.userRepository.findCandidateByEmail(data.email);
      if (existUser) throw new AppError('E-mail já existe.');
    }
  }
}
