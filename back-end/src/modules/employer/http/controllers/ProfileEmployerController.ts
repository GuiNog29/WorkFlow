import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { GetEmployerByIdService } from '@modules/employer/services/GetEmployerByIdService';
import UpdateProfileEmployerService from '@modules/employer/services/UpdateProfileEmployerService';
import { ConvertToNumber } from '@modules/user/utils/Converters';

export default class ProfileEmployerController {
  public async show(request: Request, response: Response): Promise<Response> {
    const getEmployerByIdService = container.resolve(GetEmployerByIdService);
    const userId = ConvertToNumber(request.user.id);

    if (!userId) return response.status(400).json({ message: 'Invalid user ID' });

    const user = await getEmployerByIdService.execute(userId)
    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileEmployerService = container.resolve(UpdateProfileEmployerService);
    const userId = ConvertToNumber(request.user.id);
    const { companyName, email, password, oldPassword } = request.body;

    if (!userId) return response.status(400).json({ message: 'Invalid user ID' });

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
