import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { ConvertToNumber } from '@modules/user/utils/Converters';
import { GetService } from '@modules/user/utils/ServiceResolver';
import { GetCandidateByIdService } from '@modules/candidate/services/GetCandidateByIdService';
import UpdateProfileCandidateService from '@modules/candidate/services/UpdateProfileCandidateService';

export default class ProfileCandidateController {
  public async show(request: Request, response: Response): Promise<Response> {
    const getCandidateByIdService = GetService(GetCandidateByIdService);
    const userId = ConvertToNumber(request.user.id);

    if (!userId) return response.status(400).json({ message: 'Invalid user ID' });

    const user = await getCandidateByIdService.execute(userId);
    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileCandidateService = GetService(UpdateProfileCandidateService);
    const userId = ConvertToNumber(request.user.id);
    const { name, email, password, oldPassword } = request.body;

    if (!userId) return response.status(400).json({ message: 'Invalid user ID' });

    const user = await updateProfileCandidateService.execute({
      userId,
      name,
      email,
      password,
      oldPassword,
    });

    return response.json(instanceToInstance(user));
  }
}
