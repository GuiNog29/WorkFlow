import { Request, Response } from 'express';
import { GetService } from '@modules/user/utils/ServiceResolver';
import { ResetPasswordCandidateService } from '@modules/candidate/services/ResetPasswordCandidateService';

export default class ResetPasswordCandidateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resetPasswordCandidateService = GetService(ResetPasswordCandidateService);
    await resetPasswordCandidateService.execute({ password, token });
    return response.status(204).json();
  }
}
