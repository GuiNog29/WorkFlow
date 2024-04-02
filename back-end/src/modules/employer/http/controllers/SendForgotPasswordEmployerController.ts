import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordEmailEmployerService } from '@modules/employer/services/SendForgotPasswordEmailEmployerService';

export default class SendForgotPasswordEmployerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const employer = 1;
    const sendForgotPasswordService = container.resolve(SendForgotPasswordEmailEmployerService);
    await sendForgotPasswordService.execute({ userType: employer, email });
    return response.status(204).json();
  }
}
