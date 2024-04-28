import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { GetService } from '@modules/user/utils/ServiceResolver';
import { UpdateProfilePictureCandidateService } from '@modules/candidate/services/UpdateProfilePictureCandidateService';

export default class UpdateProfilePictureCandidateController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileService = GetService(UpdateProfilePictureCandidateService);

    if (!request.file) return response.status(400).json({ message: 'Arquivo é obrigatório' });

    const candidate = await updateProfileService.execute({
      candidateId: request.user.id,
      fileName: request.file.filename,
    });

    return response.json(instanceToInstance(candidate));
  }
}
