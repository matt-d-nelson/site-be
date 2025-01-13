import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1736789003763 implements MigrationInterface {
  name = 'Migrations1736789003763'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "about" DROP CONSTRAINT "FK_e7cf250afc4344187b210063552"`,
    )
    await queryRunner.query(
      `ALTER TABLE "about" ALTER COLUMN "orgId" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "about" ADD CONSTRAINT "FK_e7cf250afc4344187b210063552" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "about" DROP CONSTRAINT "FK_e7cf250afc4344187b210063552"`,
    )
    await queryRunner.query(
      `ALTER TABLE "about" ALTER COLUMN "orgId" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "about" ADD CONSTRAINT "FK_e7cf250afc4344187b210063552" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
