import { Request, Response } from 'express';
import { GetService } from '@modules/user/utils/ServiceResolver';
import { ResetPasswordEmployerService } from '@modules/employer/services/ResetPasswordEmployerService';

export default class ResetPasswordEmployerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resetPasswordEmployerService = GetService(ResetPasswordEmployerService);
    await resetPasswordEmployerService.execute({ password, token });
    return response.status(204).json();
  }
}
