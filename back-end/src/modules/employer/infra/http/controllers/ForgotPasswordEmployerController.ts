import { Request, Response } from 'express';
import { SendForgotPasswordEmailEmployerService } from '@modules/candidate/services/SendForgotPasswordEmailEmployerService';

export default class ForgotPasswordEmployerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordService = new SendForgotPasswordEmailEmployerService();
    await sendForgotPasswordService.execute({ email });
    return response.status(204).json();
  }
}
