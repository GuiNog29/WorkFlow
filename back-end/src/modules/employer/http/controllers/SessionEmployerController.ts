import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {instanceToInstance} from 'class-transformer'
import { CreateSessionEmployerService } from '@modules/employer/services/CreateSessionEmployerService';

export default class SessionEmployerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cnpj, email, password } = request.body;

    const createSession = container.resolve(CreateSessionEmployerService);

    const employer = await createSession.execute({
      cnpj,
      email,
      password,
    });

    return response.json(instanceToInstance(employer));
  }
}
