import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Candidate1698014919856 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "Candidate",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "companyName",
            type: "varchar"
          },
          {
            name: "cnpj",
            type: "varchar"
          },
          {
            name: "email",
            type: "varchar"
          },
          {
            name: "password",
            type: "varchar"
          }
        ]
      }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("Candidate");
    }
}
