import { CandidateRepository } from "../repositories/CandidateRepository";

export default class ListCandidateService{
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  public async execute(){
    const candidates = this.candidateRepository.create
  }
}
