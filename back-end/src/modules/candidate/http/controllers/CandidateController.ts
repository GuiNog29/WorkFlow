import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { ListCandidateService } from '@modules/candidate/services/ListCandidateService';
import { CreateCandidateService } from '@modules/candidate/services/CreateCandidateService';
import { UpdateCandidateService } from '@modules/candidate/services/UpdateCandidateService';
import { GetCandidateByIdService } from '@modules/candidate/services/GetCandidateByIdService';
import { DeleteCandidateService } from '@modules/candidate/services/DeleteCandidateService';

export default class CandidateController {
  public async createCandidate(resquest: Request, response: Response): Promise<Response> {
    const createCandidateService = container.resolve(CreateCandidateService);
    return response.json(instanceToInstance(await createCandidateService.execute(resquest.body)));
  }

  public async listCandidates(request: Request, response: Response): Promise<Response> {
    const listCandidateService = container.resolve(ListCandidateService);
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const candidates = await listCandidateService.execute({ page, limit });
    return response.json(candidates);
  }

  public async updateCandidate(request: Request, response: Response): Promise<Response> {
    const updateCandidateService = container.resolve(UpdateCandidateService);
    const { id } = request.params;
    return response.json(
      instanceToInstance(await updateCandidateService.execute(Number(id), request.body)),
    );
  }

  public async getCandidateById(request: Request, response: Response): Promise<Response> {
    const getCandidateByIdService = container.resolve(GetCandidateByIdService);
    const { id } = request.params;
    return response.json(instanceToInstance(await getCandidateByIdService.execute(Number(id))));
  }

  public async deleteCandidate(request: Request, response: Response): Promise<Response> {
    const deleteCandidateService = container.resolve(DeleteCandidateService);
    const { id } = request.params;
    return response.json(await deleteCandidateService.execute(Number(id)));
  }
}
