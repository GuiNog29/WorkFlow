import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { GetService } from '@modules/user/utils/ServiceResolver';
import { UpdateProfilePictureEmployerService } from '@modules/employer/services/UpdateProfilePictureEmployerService';

export default class UpdateProfilePictureEmployerController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileService = GetService(UpdateProfilePictureEmployerService);

    if (!request.file) return response.status(400).json({ message: 'Arquivo é obrigatório' });

    const employer = await updateProfileService.execute({
      employerId: request.user.id,
      fileName: request.file.filename,
    });

    return response.json(instanceToInstance(employer));
  }
}
