import upload from '@config/upload';
import { inject, injectable } from 'tsyringe';
import redisCache from '@common/cache/RedisCache';
import { Candidate } from '../entities/Candidate';
import { AppError } from '@common/exceptions/AppError';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { DiskStorageProvider } from '@common/providers/StorageProvider/DiskStorageProvider';
import { S3StorageProvider } from '@common/providers/StorageProvider/S3StorageProvider';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';
import { ICandidate } from '../domain/models/ICandidate';
import { IStorageProvider } from '@common/providers/StorageProvider/interface/IStorageProvider';

interface IRequest {
  candidateId: string;
  fileName: string;
}

@injectable()
export class UpdateProfilePictureCandidateService {
  constructor(
    @inject('CandidateRepository')
    private candidateRepository: ICandidateRepository,
    private getCandidateByIdService: GetCandidateByIdService,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ candidateId, fileName }: IRequest): Promise<ICandidate | null> {
    const candidate = await this.getCandidateByIdService.execute(Number(candidateId));

    if (!candidate) throw new AppError('Usuário não encontrado.');

    if (candidate.profile_picture) await this.storageProvider.deleteFile(candidate.profile_picture);

    const profilePicFileName = await this.storageProvider.saveFile(fileName);

    await redisCache.invalidate('workflow-CANDIDATES_LIST');

    return await this.candidateRepository.updateProfilePicture(
      Number(candidateId),
      profilePicFileName,
    );
  }
}
