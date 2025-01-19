import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1737067854884 implements MigrationInterface {
  name = 'Migrations1737067854884'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_7d6adc8392476c9da682675f440"`,
    )
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "orgId" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "videos" DROP CONSTRAINT "FK_4e27835b1e57d1a641b70297f0d"`,
    )
    await queryRunner.query(
      `ALTER TABLE "videos" ALTER COLUMN "orgId" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_7d6adc8392476c9da682675f440" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "videos" ADD CONSTRAINT "FK_4e27835b1e57d1a641b70297f0d" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "videos" DROP CONSTRAINT "FK_4e27835b1e57d1a641b70297f0d"`,
    )
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_7d6adc8392476c9da682675f440"`,
    )
    await queryRunner.query(
      `ALTER TABLE "videos" ALTER COLUMN "orgId" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "videos" ADD CONSTRAINT "FK_4e27835b1e57d1a641b70297f0d" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "orgId" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_7d6adc8392476c9da682675f440" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
