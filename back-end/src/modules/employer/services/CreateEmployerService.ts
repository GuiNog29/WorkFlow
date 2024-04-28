import { inject, injectable } from 'tsyringe';
import { IEmployer } from '../domain/models/IEmployer';
import { ICreateEmployer } from '../domain/models/ICreateEmployer';
import { ValidEmployerDataService } from './ValidEmployerDataService';
import { ValidEmployerExistService } from './ValidEmployerExistService';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';

@injectable()
export class CreateEmployerService {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    private validEmployerExistService: ValidEmployerExistService,
    private validEmployerDataService: ValidEmployerDataService,
  ) {}

  public async execute(employerData: ICreateEmployer): Promise<IEmployer> {
    const { companyName, cnpj, email } = employerData;
    await this.validEmployerDataService.execute(companyName, email);
    await this.validEmployerExistService.execute(cnpj, companyName);
    return await this.employerRepository.create(employerData);
  }
}
