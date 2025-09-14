import { MigrationInterface, QueryRunner } from "typeorm";

export class TriviaTables1757801563270 implements MigrationInterface {
    name = 'TriviaTables1757801563270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trivia" ("id" SERIAL NOT NULL, "isDraft" boolean NOT NULL DEFAULT true, "isActive" boolean NOT NULL DEFAULT false, "name" character varying, "eventDate" character varying, "orgId" integer, CONSTRAINT "PK_faf9ea23fdea1723297b3e92c1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trivia-question" ("id" SERIAL NOT NULL, "questionNumber" integer NOT NULL, "question" character varying, "triviaId" integer, CONSTRAINT "PK_3185f3d2bb6a8312ef9e29c02e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trivia-option" ("id" SERIAL NOT NULL, "text" character varying, "isCorrect" boolean NOT NULL DEFAULT false, "questionId" integer, CONSTRAINT "PK_b0685e0cc402421896e2ca864c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trivia-submission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "score" integer NOT NULL, "orgId" integer, "triviaId" integer, CONSTRAINT "PK_f0e100a2cc9eaa744de41089f7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD CONSTRAINT "FK_a502dd684fc9950a6a18a26e09c" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trivia-question" ADD CONSTRAINT "FK_42a5a513aaa33153ed85c8c679f" FOREIGN KEY ("triviaId") REFERENCES "trivia"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trivia-option" ADD CONSTRAINT "FK_b330105c1c4cb4310639a1fcbab" FOREIGN KEY ("questionId") REFERENCES "trivia-question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trivia-submission" ADD CONSTRAINT "FK_0768dc1efbca4fffa6b356613ba" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trivia-submission" ADD CONSTRAINT "FK_22a917ce14270d62ee115fa8b8b" FOREIGN KEY ("triviaId") REFERENCES "trivia"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trivia-submission" DROP CONSTRAINT "FK_22a917ce14270d62ee115fa8b8b"`);
        await queryRunner.query(`ALTER TABLE "trivia-submission" DROP CONSTRAINT "FK_0768dc1efbca4fffa6b356613ba"`);
        await queryRunner.query(`ALTER TABLE "trivia-option" DROP CONSTRAINT "FK_b330105c1c4cb4310639a1fcbab"`);
        await queryRunner.query(`ALTER TABLE "trivia-question" DROP CONSTRAINT "FK_42a5a513aaa33153ed85c8c679f"`);
        await queryRunner.query(`ALTER TABLE "trivia" DROP CONSTRAINT "FK_a502dd684fc9950a6a18a26e09c"`);
        await queryRunner.query(`DROP TABLE "trivia-submission"`);
        await queryRunner.query(`DROP TABLE "trivia-option"`);
        await queryRunner.query(`DROP TABLE "trivia-question"`);
        await queryRunner.query(`DROP TABLE "trivia"`);
    }

}
