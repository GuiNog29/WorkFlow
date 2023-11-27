import { AppError } from "@shared/exceptions/AppError";
import { CandidateRepository } from "../repositories/CandidateRepository";

export class ValidCandidateExistService {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  public async execute(cpf: string, email: string) {
    let existUser: any;
    existUser = await this.candidateRepository.findCandidateByCpf(cpf);
    if (existUser) throw new AppError('CPF já existe.');

    existUser = await this.candidateRepository.findCandidateByEmail(email);
    if (existUser) throw new AppError('E-mail já existe.');
  }
}
