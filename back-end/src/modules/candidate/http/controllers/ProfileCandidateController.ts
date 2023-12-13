import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { GetCandidateByIdService } from '@modules/candidate/services/GetCandidateByIdService';
import UpdateProfileCandidateService from '@modules/candidate/services/UpdateProfileCandidateService';

export default class ProfileCandidateController {
  public async show(request: Request, response: Response): Promise<Response> {
    const getCandidateByIdService = new GetCandidateByIdService();
    const userId = Number(request.user.id);
    return response.json(instanceToInstance(await getCandidateByIdService.execute(userId)));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileCandidateService = new UpdateProfileCandidateService();
    const userId = request.user.id;
    const { name, email, password, oldPassword } = request.body;

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
