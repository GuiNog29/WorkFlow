import { Candidate } from '../entities/Candidate';
import { RedisCache } from '@shared/cache/RedisCache';
import { AppError } from '@shared/exceptions/AppError';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { CandidateRepository } from '../repositories/CandidateRepository';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/DiskStorageProvider';

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
    const redisCache = new RedisCache();
    const getCandidateByIdService = new GetCandidateByIdService();
    const candidate = await getCandidateByIdService.execute(Number(candidateId));
    const storageProvider = new DiskStorageProvider();

    if (!candidate) throw new AppError('Usuário não encontrado.');

    if (candidate.profile_picture) await storageProvider.deleteFile(candidate.profile_picture);

    const profilePicFileName = await storageProvider.saveFile(fileName);

    await redisCache.invalidate('workflow-CANDIDATES_LIST');

    return await this.candidateRepository.updateProfilePicture(
      Number(candidateId),
      profilePicFileName,
    );
  }
}
