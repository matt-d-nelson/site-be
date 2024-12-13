import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1733920839274 implements MigrationInterface {
    name = 'Migrations1733920839274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "date" character varying NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "orgId" integer, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_7d6adc8392476c9da682675f440" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_7d6adc8392476c9da682675f440"`);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
