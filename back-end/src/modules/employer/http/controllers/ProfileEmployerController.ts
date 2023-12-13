import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { GetEmployerByIdService } from '@modules/employer/services/GetEmployerByIdService';
import UpdateProfileEmployerService from '@modules/employer/services/UpdateProfileEmployerService';

export default class ProfileEmployerController {
  public async show(request: Request, response: Response): Promise<Response> {
    const getEmployerByIdService = new GetEmployerByIdService();
    const userId = Number(request.user.id);
    return response.json(instanceToInstance(await getEmployerByIdService.execute(userId)));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileEmployerService = new UpdateProfileEmployerService();
    const userId = request.user.id;
    const { companyName, email, password, oldPassword } = request.body;

    const user = await updateProfileEmployerService.execute({
      userId,
      companyName,
      email,
      password,
      oldPassword,
    });

    return response.json(instanceToInstance(user));
  }
}
