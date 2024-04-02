import { IEmployer } from '../domain/models/IEmployer';
import { inject, injectable } from 'tsyringe';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';
import { ValidEmployerDataService } from './ValidEmployerDataService';
import { ValidEmployerExistService } from './ValidEmployerExistService';

@injectable()
export class CreateEmployerService {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    private validEmployerExistService: ValidEmployerExistService,
    private validEmployerDataService: ValidEmployerDataService,
  ) {
    this.employerRepository = employerRepository;
    this.validEmployerExistService = validEmployerExistService;
    this.validEmployerDataService = validEmployerDataService;
  }

  public async execute({ companyName, cnpj, email, password }: IEmployer): Promise<IEmployer> {
    await this.validEmployerDataService.execute(companyName, email);
    await this.validEmployerExistService.execute(cnpj, companyName);

    return await this.employerRepository.create({
      companyName,
      cnpj,
      email,
      password,
    });
  }
}
