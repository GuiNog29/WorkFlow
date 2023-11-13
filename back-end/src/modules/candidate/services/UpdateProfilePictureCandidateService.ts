import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import { Candidate } from '../infra/typeorm/entities/Candidate';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { CandidateRepository } from '../infra/typeorm/repositories/CandidateRepository';

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

    if (!candidate) throw new AppError('Usuário não encontrado.');

    if (candidate.profile_picture) {
      const candidateProfilePicturePath = path.join(
        uploadConfig.directory,
        candidate.profile_picture,
      );

      const candidateProfilePictureExists = await fs.promises.stat(candidateProfilePicturePath);

      if (candidateProfilePictureExists) await fs.promises.unlink(candidateProfilePicturePath);
    }

    return await this.candidateRepository.updateProfilePicture(Number(candidateId), fileName);
  }
}
