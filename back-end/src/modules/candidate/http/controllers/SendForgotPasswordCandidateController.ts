import { Request, Response } from 'express';
import { SendForgotPasswordEmailCandidateService } from '@modules/candidate/services/SendForgotPasswordEmailCandidateService';

export default class SendForgotPasswordCandidateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const candidate = 2;
    const sendForgotPasswordService = new SendForgotPasswordEmailCandidateService();
    await sendForgotPasswordService.execute({ userType: candidate, email });
    return response.status(204).json();
  }
}
