import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { CreateEmployerService } from '@modules/employer/services/CreateEmployerService';
import { DeleteEmployerService } from '@modules/employer/services/DeleteEmployerService';
import { UpdateEmployerService } from '@modules/employer/services/UpdateEmployerService';
import { GetEmployerByIdService } from '@modules/employer/services/GetEmployerByIdService';

export default class EmployerController {
  public async createEmployer(resquest: Request, response: Response): Promise<Response> {
    const createEmployerService = container.resolve(CreateEmployerService);
    return response.json(instanceToInstance(await createEmployerService.execute(resquest.body)));
  }

  public async updateEmployer(request: Request, response: Response): Promise<Response> {
    const updateEmployerService = container.resolve(UpdateEmployerService);
    const { id } = request.params;
    return response.json(
      instanceToInstance(await updateEmployerService.execute(Number(id), request.body)),
    );
  }

  public async getEmployerById(request: Request, response: Response): Promise<Response> {
    const getEmployerByIdService = container.resolve(GetEmployerByIdService);
    const { id } = request.params;
    return response.json(instanceToInstance(await getEmployerByIdService.execute(Number(id))));
  }

  public async deleteEmployer(request: Request, response: Response): Promise<Response> {
    const deleteEmployerService = container.resolve(DeleteEmployerService);
    const { id } = request.params;
    return response.json(await deleteEmployerService.execute(Number(id)));
  }
}
