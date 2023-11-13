import { CreateSessionCandidateService } from '@modules/candidate/services/CreateSessionCandidateService';
import { Request, Response } from 'express';

export default class SessionCandidateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, email, password } = request.body;

    const createSession = new CreateSessionCandidateService();

    const candidate = await createSession.execute({
      cpf,
      email,
      password,
    });

    return response.json(candidate);
  }
}
