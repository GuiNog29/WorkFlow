import redisCache from '@common/cache/RedisCache';
import { UpdateResult } from 'typeorm';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { ValidCandidateDataService } from './ValidCandidateDataService';
import { CandidateRepository } from '../repositories/CandidateRepository';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
export class UpdateCandidateService {
  constructor(
    @inject('CandidateRepository')
    private candidateRepository: ICandidateRepository,
    private getCandidateByIdService: GetCandidateByIdService,
    private validCandidateDataService: ValidCandidateDataService,
  ) {
    this.candidateRepository = candidateRepository;
    this.getCandidateByIdService = getCandidateByIdService;
    this.validCandidateDataService = validCandidateDataService;
  }

  async execute(candidateId: number, { name, email }: IRequest): Promise<UpdateResult> {
    await this.validCandidateDataService.execute(name, email);
    const candidate = await this.getCandidateByIdService.execute(candidateId);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    await redisCache.invalidate('workflow-CANDIDATES_LIST');

    return await this.candidateRepository.update(candidateId, {
      name,
      email,
      password: candidate.password,
      cpf: candidate.cpf,
    });
  }
}
