import { Request, Response } from 'express';
import { UpdateProfilePictureEmployerService } from '@modules/employer/services/UpdateProfilePictureEmployerService';

export default class UpdateProfilePictureEmployerController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileService = new UpdateProfilePictureEmployerService();
    const employer = await updateProfileService.execute({
      employerId: request.user.id,
      fileName: request.file?.filename as string,
    });

    return response.json(employer);
  }
}
