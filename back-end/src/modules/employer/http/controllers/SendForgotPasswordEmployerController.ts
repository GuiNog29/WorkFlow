import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserType } from '@modules/user/entities/UserType';
import { IsEmail, validateOrReject } from 'class-validator';
import { GetService } from '@modules/user/utils/ServiceResolver';
import { SendForgotPasswordEmailEmployerService } from '@modules/employer/services/SendForgotPasswordEmailEmployerService';

class ForgotPassworRequest {
  @IsEmail()
  email: string;
}

export default class SendForgotPasswordEmployerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const employer = UserType.Employer;

    try {
      await validateOrReject(plainToInstance(ForgotPassworRequest, { email }));
      const sendForgotPasswordService = GetService(SendForgotPasswordEmailEmployerService);
      await sendForgotPasswordService.execute({ userType: employer, email });
      return response.status(204).json();
    } catch (error) {
      return response.status(400).json({ message: 'Invalid request', details: error });
    }
  }
}
