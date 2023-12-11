import { Request, Response } from 'express';
import { GetEmployerByIdService } from '@modules/employer/services/GetEmployerByIdService';
import UpdateProfileEmployerService from '@modules/employer/services/UpdateProfileEmployerService';

export default class ProfileEmployerController {
  public async show(request: Request, response: Response): Promise<Response> {
    const getEmployerByIdService = new GetEmployerByIdService();
    const userId = Number(request.user.id);
    const employer = await getEmployerByIdService.execute(userId);
    return response.json(employer);
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

    return response.json(user);
  }
}
