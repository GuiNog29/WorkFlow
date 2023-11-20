import { Request, Response } from 'express';
import { SendForgotPasswordEmailCandidateService } from '@modules/candidate/services/SendForgotPasswordEmailCandidateService';

export default class ForgotPasswordCandidateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordService = new SendForgotPasswordEmailCandidateService();
    await sendForgotPasswordService.execute({ email });
    return response.status(204).json();
  }
}
