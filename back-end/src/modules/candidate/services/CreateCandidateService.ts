import { ICandidate } from '../domain/models/ICandidate';
import { Candidate } from '../entities/Candidate';
import { ValidCandidateExistService } from './ValidCandidateExistService';
import { CandidateRepository } from '../repositories/CandidateRepository';

export class CreateCandidateService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  public async execute({ name, cpf, email, password }: ICandidate): Promise<Candidate> {
    const validCandidateExistService = new ValidCandidateExistService();
    await validCandidateExistService.execute(cpf, email);

    return await this.candidateRepository.create({ name, cpf, email, password });
  }
}
