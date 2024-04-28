import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { GetService } from '@modules/user/utils/ServiceResolver';
import { ListCandidateService } from '@modules/candidate/services/ListCandidateService';
import { CreateCandidateService } from '@modules/candidate/services/CreateCandidateService';
import { UpdateCandidateService } from '@modules/candidate/services/UpdateCandidateService';
import { GetCandidateByIdService } from '@modules/candidate/services/GetCandidateByIdService';
import { DeleteCandidateService } from '@modules/candidate/services/DeleteCandidateService';

export default class CandidateController {
  public async createCandidate(resquest: Request, response: Response): Promise<Response> {
    const createCandidateService = GetService(CreateCandidateService);
    const candidate = await createCandidateService.execute(resquest.body);
    return response.json(instanceToInstance(candidate));
  }

  public async listCandidates(request: Request, response: Response): Promise<Response> {
    const listCandidateService = GetService(ListCandidateService);
    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 15;
    const candidates = await listCandidateService.execute({ page, limit });
    return response.json(candidates);
  }

  public async updateCandidate(request: Request, response: Response): Promise<Response> {
    const updateCandidateService = GetService(UpdateCandidateService);
    const { id } = request.params;
    const candidate = await updateCandidateService.execute(Number(id), request.body);
    return response.json(instanceToInstance(candidate));
  }

  public async getCandidateById(request: Request, response: Response): Promise<Response> {
    const getCandidateByIdService = GetService(GetCandidateByIdService);
    const { id } = request.params;
    const candidate = await getCandidateByIdService.execute(Number(id));
    return response.json(instanceToInstance(candidate));
  }

  public async deleteCandidate(request: Request, response: Response): Promise<Response> {
    const deleteCandidateService = GetService(DeleteCandidateService);
    const { id } = request.params;
    return response.json(await deleteCandidateService.execute(Number(id)));
  }

  private getService<T>(service: new (...args: any[]) => T): T {
    return container.resolve(service);
  }
}
