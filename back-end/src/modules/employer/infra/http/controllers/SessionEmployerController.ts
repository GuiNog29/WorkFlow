import { CreateSessionEmployerService } from '@modules/employer/services/CreateSessionEmployerService';
import { Request, Response } from 'express';

export default class SessionEmployerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cnpj, email, password } = request.body;

    const createSession = new CreateSessionEmployerService();

    const employer = await createSession.execute({
      cnpj,
      email,
      password,
    });

    return response.json(employer);
  }
}
