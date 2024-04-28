import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IsEmail, validateOrReject } from 'class-validator';
import { SendForgotPasswordEmailCandidateService } from '@modules/candidate/services/SendForgotPasswordEmailCandidateService';
import { UserType } from '@modules/user/entities/UserType';
import { plainToInstance } from 'class-transformer';

class ForgotPassworRequest {
  @IsEmail()
  email: string;
}

export default class SendForgotPasswordCandidateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const candidate = UserType.Candidate;

    try {
      await validateOrReject(plainToInstance(ForgotPassworRequest, { email }));
      const sendForgotPasswordService = container.resolve(SendForgotPasswordEmailCandidateService);
      await sendForgotPasswordService.execute({ userType: candidate, email });
      return response.status(204).json();
    } catch (error) {
      return response.status(400).json({ message: 'Invalid request', details: error });
    }
  }
}
