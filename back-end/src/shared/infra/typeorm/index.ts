import { DataSource } from 'typeorm';

import { Candidate } from '../../../modules/candidate/infra/typeorm/entities/Candidate';
import { Employer } from '../../../modules/employer/infra/typeorm/entities/Employer';

import { Employer1698014743678 } from './migrations/1698014743678-Employer';
import { Candidate1698014919856 } from './migrations/1698014919856-Candidate';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'dbworkflow',
  entities: [Employer, Candidate],
  migrations: [Employer1698014743678, Candidate1698014919856],
});
