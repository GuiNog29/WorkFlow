import { UpdateResult } from 'typeorm';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { GetEmployerByIdService } from './GetEmployerByIdService';
import { IUpdateEmployer } from '../domain/models/IUpdateEmployer';
import { ValidEmployerDataService } from './ValidEmployerDataService';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';

interface IRequest {
  companyName: string;
  email: string;
}

@injectable()
export class UpdateEmployerService {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    private getEmployerByIdService: GetEmployerByIdService,
    private validEmployerDataService: ValidEmployerDataService,
  ) {}

  public async execute(
    employerId: number,
    { companyName, email }: IRequest,
  ): Promise<UpdateResult> {
    await this.validEmployerDataService.execute(companyName, email);
    const employer = await this.getEmployerByIdService.execute(employerId);

    if (!employer) throw new AppError('Usuário não encontrado.');

    const updateData: IUpdateEmployer = { companyName, email };
    const updatedResult = await this.employerRepository.update(employerId, updateData);

    if (updatedResult.affected && updatedResult.affected <= 0)
      throw new AppError('Nenhuma atualização realizada.');

    return updatedResult;
  }
}
