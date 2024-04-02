import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { UpdateProfilePictureCandidateService } from '@modules/candidate/services/UpdateProfilePictureCandidateService';

export default class UpdateProfilePictureCandidateController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileService = container.resolve(UpdateProfilePictureCandidateService);
    const candidate = await updateProfileService.execute({
      candidateId: request.user.id,
      fileName: request.file?.filename as string,
    });

    return response.json(instanceToInstance(candidate));
  }
}
