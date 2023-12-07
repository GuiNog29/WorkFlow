import { Request, Response } from 'express';
import { ResetPasswordCandidateService } from '@modules/candidate/services/ResetPasswordCandidateService';

export default class ResetPasswordCandidateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resetPasswordCandidateService = new ResetPasswordCandidateService();
    await resetPasswordCandidateService.execute({ password, token });
    return response.status(204).json();
  }
}
