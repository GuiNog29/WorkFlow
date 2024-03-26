import { AppError } from '@common/exceptions/AppError';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';

export class ValidCandidateExistService {
  constructor(private candidateRepository: ICandidateRepository) {
    this.candidateRepository = candidateRepository;
  }

  public async execute(cpf: string, email: string) {
    let existUser: any;
    existUser = await this.candidateRepository.findCandidateByCpf(cpf);
    if (existUser) throw new AppError('CPF já existe.');

    existUser = await this.candidateRepository.findCandidateByEmail(email);
    if (existUser) throw new AppError('E-mail já existe.');
  }
}
