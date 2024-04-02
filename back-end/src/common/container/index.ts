import { container } from 'tsyringe';
import { EmployerRepository } from '@modules/employer/repositories/EmployerRepository';
import { CandidateRepository } from '@modules/candidate/repositories/CandidateRepository';
import { ICandidateRepository } from '@modules/candidate/repositories/interface/ICandidateRepository';
import { IUserTokensRepository } from '@modules/user/repositories/interface/IUserTokensRepository';
import { UserTokensRepository } from '@modules/user/repositories/UserTokensRepository';
import { IEmployerRepository } from '@modules/employer/repositories/interface/IEmployerRepository';

container.registerSingleton<ICandidateRepository>('CandidateRepository', CandidateRepository)
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository)
container.registerSingleton<IEmployerRepository>('EmployerRepository', EmployerRepository)
