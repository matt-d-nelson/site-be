import { MigrationInterface, QueryRunner } from "typeorm";

export class AboutTables1733260736904 implements MigrationInterface {
    name = 'AboutTables1733260736904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "about" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "biography" text NOT NULL, "imageUrl" character varying NOT NULL, "isPrimary" boolean NOT NULL, "orgId" integer, CONSTRAINT "PK_e7b581a8a74d0a2ea3aa53226ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "about" ADD CONSTRAINT "FK_e7cf250afc4344187b210063552" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "about" DROP CONSTRAINT "FK_e7cf250afc4344187b210063552"`);
        await queryRunner.query(`DROP TABLE "about"`);
    }

}
