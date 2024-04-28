import redisCache from '@common/cache/RedisCache';
import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@common/exceptions/AppError';
import { GetCandidateByIdService } from './GetCandidateByIdService';
import { ICandidateRepository } from '../repositories/interface/ICandidateRepository';
import { ICandidate } from '../domain/models/ICandidate';

interface IRequest {
  userId: number;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
export default class UpdateProfileCandidateService {
  constructor(
    @inject('CandidateRepository')
    private candidateRepository: ICandidateRepository,
    private getCandidateByIdService: GetCandidateByIdService,
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<ICandidate | null> {
    const candidate = await this.getCandidateByIdService.execute(Number(userId));

    if (!candidate) throw new AppError('Usuário não encontrado.');

    if (email !== candidate.email && (await this.candidateRepository.findCandidateByEmail(email)))
      throw new AppError('Este e-mail já foi cadastrado.');

    if (password) {
      if (!oldPassword) throw new AppError('Senha antiga deve ser preenchida.');

      if (!(await compare(oldPassword, candidate.password)))
        throw new AppError('Senha antiga não confere.');

      candidate.password = await hash(password, 8);
    }

    candidate.name = name;
    candidate.email = email;

    await this.candidateRepository.save(candidate);

    await redisCache.invalidate('workflow-CANDIDATES_LIST');

    return candidate;
  }
}
