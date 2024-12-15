import { MigrationInterface, QueryRunner } from "typeorm";

export class VideosTable1734280632371 implements MigrationInterface {
    name = 'VideosTable1734280632371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "videos" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "link" character varying NOT NULL, "orgId" integer, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_4e27835b1e57d1a641b70297f0d" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_4e27835b1e57d1a641b70297f0d"`);
        await queryRunner.query(`DROP TABLE "videos"`);
    }

}
