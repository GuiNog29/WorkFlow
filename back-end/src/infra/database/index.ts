import { DataSource } from 'typeorm';

import { Employer } from '@modules/employer/entities/Employer';
import { Candidate } from '@modules/candidate/entities/Candidate';
import { UserToken } from '@modules/user/entities/UserToken';

import { Employer1698014743678 } from './migrations/1698014743678-Employer';
import { Candidate1698014919856 } from './migrations/1698014919856-Candidate';
import { UserToken1700323626589 } from './migrations/1700323626589-UserToken';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'dbworkflow',
  entities: [Employer, Candidate, UserToken],
  migrations: [Employer1698014743678, Candidate1698014919856, UserToken1700323626589],
  synchronize: true,
});
