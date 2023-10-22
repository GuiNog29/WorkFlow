import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'dbworkflow',
  entities: [],
  migrations: [],
});
