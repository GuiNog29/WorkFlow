import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { GetCandidateByIdService } from '@modules/candidate/services/GetCandidateByIdService';
import UpdateProfileCandidateService from '@modules/candidate/services/UpdateProfileCandidateService';

export default class ProfileCandidateController {
  public async show(request: Request, response: Response): Promise<Response> {
    const getCandidateByIdService = this.getService(GetCandidateByIdService);
    const userId = this.convertToNumber(request.user.id);

    if (!userId) return response.status(400).json({ message: 'Invalid user ID' });

    const user = await getCandidateByIdService.execute(userId);
    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileCandidateService = this.getService(UpdateProfileCandidateService);
    const userId = this.convertToNumber(request.user.id);

    if (!userId) return response.status(400).json({ message: 'Invalid user ID' });

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

  private getService<T>(service: new (...args: any[]) => T): T {
    return container.resolve(service);
  }

  private convertToNumber(id: any): number | null {
    const converted = Number(id);
    return isNaN(converted) ? null : converted;
  }
}
