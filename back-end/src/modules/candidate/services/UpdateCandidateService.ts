import redisCache from '@common/cache/RedisCache';
import { UpdateResult } from 'typeorm';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { ValidCandidateDataService } from './ValidCandidateDataService';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';
import { IUpdateCandidate } from '../domain/models/IUpdateCandidate';

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
  ) {}

  async execute(candidateId: number, { name, email }: IRequest): Promise<UpdateResult> {
    const candidate = await this.getCandidateByIdService.execute(candidateId);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    await this.validCandidateDataService.execute(name, email);

    const updateData: IUpdateCandidate = { name, email };
    const updatedResult = await this.candidateRepository.update(candidateId, updateData);

    if (updatedResult.affected && updatedResult.affected > 0)
      await redisCache.invalidate('workflow-CANDIDATES_LIST');
    else throw new AppError('Nenhuma atualização realizada.');

    return updatedResult;
  }
}
