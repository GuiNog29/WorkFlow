import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { GetService } from '@modules/user/utils/ServiceResolver';
import { CreateSessionCandidateService } from '@modules/candidate/services/CreateSessionCandidateService';

export default class SessionCandidateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, email, password } = request.body;

    const createSession = GetService(CreateSessionCandidateService);

    const candidate = await createSession.execute({
      cpf,
      email,
      password,
    });

    return response.json(instanceToInstance(candidate));
  }
}
