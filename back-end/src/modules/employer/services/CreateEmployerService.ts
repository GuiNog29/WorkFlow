import { IEmployer } from '../domain/models/IEmployer';
import { IEmployerRepository } from '../repositories/interface/IEmployerRepository';
import { ValidEmployerDataService } from './ValidEmployerDataService';
import { ValidEmployerExistService } from './ValidEmployerExistService';

export class CreateEmployerService {
  constructor(
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
