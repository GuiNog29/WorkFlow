import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserToken1700323626589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_tokens',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'token',
            type: 'uuid',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'userType',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            name: 'TokenEmployer',
            referencedTableName: 'employers',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'TokenCandidate',
            referencedTableName: 'candidates',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_tokens');
  }
}
