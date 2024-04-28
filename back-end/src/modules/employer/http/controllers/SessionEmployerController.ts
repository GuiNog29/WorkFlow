import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { GetService } from '@modules/user/utils/ServiceResolver';
import { CreateSessionEmployerService } from '@modules/employer/services/CreateSessionEmployerService';

export default class SessionEmployerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cnpj, email, password } = request.body;

    const createSession = GetService(CreateSessionEmployerService);

    const employer = await createSession.execute({
      cnpj,
      email,
      password,
    });

    return response.json(instanceToInstance(employer));
  }
}
