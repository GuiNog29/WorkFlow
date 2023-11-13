import { Request, Response } from 'express';
import { UpdateProfilePictureCandidateService } from '@modules/candidate/services/UpdateProfilePictureCandidateService';

export default class UpdateProfilePictureCandidateController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileService = new UpdateProfilePictureCandidateService();
    const candidate = await updateProfileService.execute({
      candidateId: request.user.id,
      fileName: request.file?.filename as string,
    });

    return response.json(candidate);
  }
}
