import redisCache  from '@common/cache/RedisCache';
import { compare, hash } from 'bcryptjs';
import { Candidate } from '../entities/Candidate';
import { AppError } from '@common/exceptions/AppError';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

export default class UpdateProfileCandidateService {
  constructor(
    private candidateRepository: ICandidateRepository,
    private getCandidateByIdService: GetCandidateByIdService,
  ) {
    this.candidateRepository = candidateRepository;
    this.getCandidateByIdService = getCandidateByIdService;
  }

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<Candidate | null> {
    const candidate = await this.getCandidateByIdService.execute(Number(userId));

    if (!candidate) throw new AppError('Usuário não encontrado.');

    const candidateEmail = await this.candidateRepository.findCandidateByEmail(email);

    if (candidateEmail && candidateEmail.id !== Number(userId))
      throw new AppError('Este e-mail já foi cadastrado.');

    if (password && !oldPassword) throw new AppError('Senha antiga deve ser preenchida.');

    if (password && oldPassword) {
      const verifyOldPassword = await compare(oldPassword, candidate.password);

      if (!verifyOldPassword) throw new AppError('Senha antiga não confere.');

      candidate.password = await hash(password, 8);
    }

    candidate.name = name;
    candidate.email = email;

    await redisCache.invalidate('workflow-CANDIDATES_LIST');

    await this.candidateRepository.save(candidate);

    return candidate;
  }
}
