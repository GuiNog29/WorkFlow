import { ICandidate } from '../domain/models/ICandidate';
import { CandidateRepository } from '../infra/typeorm/repositories/CandidateRepository';
import { Candidate } from '../infra/typeorm/entities/Candidate';
import { ValidCandidateExistService } from './ValidCandidateExistService';

export class CreateCandidateService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  public async excecute({ name, cpf, email, password }: ICandidate): Promise<Candidate> {
    const validCandidateExistService = new ValidCandidateExistService();
    await validCandidateExistService.execute(cpf, email);

    return await this.candidateRepository.create({ name, cpf, email, password });
  }
}
