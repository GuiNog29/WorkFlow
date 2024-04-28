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
  ) {}

  async execute({ candidateId, fileName }: IRequest): Promise<ICandidate | null> {
    let profilePicFileName = '';
    const candidate = await this.getCandidateByIdService.execute(Number(candidateId));

    if (!candidate) throw new AppError('Usuário não encontrado.');

    if (upload.driver === 's3') {
      const s3Provider = new S3StorageProvider();

      if (candidate.profile_picture) await s3Provider.deleteFile(candidate.profile_picture);

      let profilePicFileName = await s3Provider.saveFile(fileName);
    } else {
      const diskProvider = new DiskStorageProvider();

      if (candidate.profile_picture) await diskProvider.deleteFile(candidate.profile_picture);

      let profilePicFileName = await diskProvider.saveFile(fileName);
    }

    await redisCache.invalidate('workflow-CANDIDATES_LIST');

    return await this.candidateRepository.updateProfilePicture(
      Number(candidateId),
      profilePicFileName,
    );
  }
}
