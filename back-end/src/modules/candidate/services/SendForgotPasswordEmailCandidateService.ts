import { AppError } from '@shared/errors/AppError';
import { UserTokensRepository } from '@modules/user/infra/typeorm/repositories/UserTokensRepository';
import { CandidateRepository } from '@modules/candidate/infra/typeorm/repositories/CandidateRepository';

interface IRequest {
  email: string;
  userType: number;
}

export class SendForgotPasswordEmailCandidateService {
  private candidateRepository: CandidateRepository;
  private userTokenRepository: UserTokensRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
    this.userTokenRepository = new UserTokensRepository();
  }

  public async execute({ userType, email }: IRequest) : Promise<void> {
    const candidate = await this.candidateRepository.findCandidateByEmail(email);

    if (!candidate) throw new AppError('Usuário não encontrado.');

    const token = await this.userTokenRepository.generateToken(userType, candidate.id);
  }
}
