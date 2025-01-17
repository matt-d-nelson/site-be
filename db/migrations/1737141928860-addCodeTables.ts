import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCodeTables1737141928860 implements MigrationInterface {
  name = 'AddCodeTables1737141928860'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "code-project" ("id" SERIAL NOT NULL, "orgId" integer NOT NULL, "date" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "repo" character varying NOT NULL, "link" character varying, "imageId" character varying NOT NULL, "imageUrl" character varying NOT NULL, CONSTRAINT "PK_7ef0c2a861a7b82170c164eb468" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "code-project" ADD CONSTRAINT "FK_74e166b733174770d07b8008bc2" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "code-project" DROP CONSTRAINT "FK_74e166b733174770d07b8008bc2"`,
    )
    await queryRunner.query(`DROP TABLE "code-project"`)
  }
}
