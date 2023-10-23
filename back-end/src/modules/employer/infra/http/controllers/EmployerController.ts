import { CreateEmployerService } from "@modules/employer/services/CreateEmployerService";
import { Request, Response } from "express";

export default class EmployerController{
  public async createEmployer(resquest: Request, response: Response){
    const employerService = new CreateEmployerService();
    return response.json(await employerService.execute(resquest.body));
  }
}
