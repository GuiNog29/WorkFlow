import { AppError } from '@common/exceptions/AppError';
import { inject } from 'tsyringe';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';

export class ValidCandidateExistService {
  constructor(
    @inject('CandidateRepository')
    private candidateRepository: ICandidateRepository,
  ) {}

  public async execute(cpf: string, email: string) {
    const existCpfUser = await this.candidateRepository.findCandidateByCpf(cpf);
    if (existCpfUser) throw new AppError('CPF já existe.');

    const existEmailUser = await this.candidateRepository.findCandidateByEmail(email);
    if (existEmailUser) throw new AppError('E-mail já existe.');
  }
}
