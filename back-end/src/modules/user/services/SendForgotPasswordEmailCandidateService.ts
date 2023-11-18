import { AppError } from '@shared/errors/AppError';
import { UserTokensRepository } from '../infra/typeorm/repositories/UserTokensRepository';
import { CandidateRepository } from '@modules/candidate/infra/typeorm/repositories/CandidateRepository';

interface IRequest {
  email: string;
}

export class SendForgotPasswordEmailCandidateService {
  private candidateRepository: CandidateRepository;
  private userTokenRepository: UserTokensRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
    this.userTokenRepository = new UserTokensRepository();
  }

  public async execute({ email }: IRequest) : Promise<void> {
    const candidate = await this.candidateRepository.findCandidateByEmail(email);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    const token = await this.userTokenRepository.generateToken(candidate.id);
  }
}
