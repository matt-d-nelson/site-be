import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthTables1731517333972 implements MigrationInterface {
    name = 'AuthTables1731517333972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth-user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fb23672982c60ac217cd9bb0578" UNIQUE ("email"), CONSTRAINT "PK_a64fb1a958b3237b21a555b996b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth-org" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_98317096aed8752406206c5144d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."auth-org-role_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "auth-org-role" ("id" SERIAL NOT NULL, "role" "public"."auth-org-role_role_enum" NOT NULL DEFAULT 'user', "userIdId" integer, "orgIdId" integer, CONSTRAINT "PK_acc6a7a5a75add31441cad7bf70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" ADD CONSTRAINT "FK_d383dc1f7e79ee0042b2ea61441" FOREIGN KEY ("userIdId") REFERENCES "auth-user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" ADD CONSTRAINT "FK_4b0a9d9c500235552447e4cfdd1" FOREIGN KEY ("orgIdId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth-org-role" DROP CONSTRAINT "FK_4b0a9d9c500235552447e4cfdd1"`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" DROP CONSTRAINT "FK_d383dc1f7e79ee0042b2ea61441"`);
        await queryRunner.query(`DROP TABLE "auth-org-role"`);
        await queryRunner.query(`DROP TYPE "public"."auth-org-role_role_enum"`);
        await queryRunner.query(`DROP TABLE "auth-org"`);
        await queryRunner.query(`DROP TABLE "auth-user"`);
    }

}
