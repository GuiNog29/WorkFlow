import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { GetService } from '@modules/user/utils/ServiceResolver';
import { CreateEmployerService } from '@modules/employer/services/CreateEmployerService';
import { DeleteEmployerService } from '@modules/employer/services/DeleteEmployerService';
import { UpdateEmployerService } from '@modules/employer/services/UpdateEmployerService';
import { GetEmployerByIdService } from '@modules/employer/services/GetEmployerByIdService';

export default class EmployerController {
  public async createEmployer(resquest: Request, response: Response): Promise<Response> {
    const createEmployerService = GetService(CreateEmployerService);
    const employer = await createEmployerService.execute(resquest.body);
    return response.json(instanceToInstance(employer));
  }

  public async updateEmployer(request: Request, response: Response): Promise<Response> {
    const updateEmployerService = GetService(UpdateEmployerService);
    const { id } = request.params;
    const employer = await updateEmployerService.execute(Number(id), request.body);
    return response.json(instanceToInstance(employer));
  }

  public async getEmployerById(request: Request, response: Response): Promise<Response> {
    const getEmployerByIdService = GetService(GetEmployerByIdService);
    const { id } = request.params;
    const employer = await getEmployerByIdService.execute(Number(id));
    return response.json(instanceToInstance(employer));
  }

  public async deleteEmployer(request: Request, response: Response): Promise<Response> {
    const deleteEmployerService = GetService(DeleteEmployerService);
    const { id } = request.params;
    return response.json(await deleteEmployerService.execute(Number(id)));
  }
}
