import upload from '@config/upload';
import redisCache  from '@common/cache/RedisCache';
import { Candidate } from '../entities/Candidate';
import { AppError } from '@common/exceptions/AppError';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { CandidateRepository } from '../repositories/CandidateRepository';
import { DiskStorageProvider } from '@common/providers/StorageProvider/DiskStorageProvider';
import { S3StorageProvider } from '@common/providers/StorageProvider/S3StorageProvider';

interface IRequest {
  candidateId: string;
  fileName: string;
}

export class UpdateProfilePictureCandidateService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  async execute({ candidateId, fileName }: IRequest): Promise<Candidate | null> {
    const getCandidateByIdService = new GetCandidateByIdService();
    const candidate = await getCandidateByIdService.execute(Number(candidateId));
    let profilePicFileName = '';
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
