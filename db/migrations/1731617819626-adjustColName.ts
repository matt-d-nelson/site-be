import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustColName1731617819626 implements MigrationInterface {
    name = 'AdjustColName1731617819626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth-org-role" DROP CONSTRAINT "FK_d383dc1f7e79ee0042b2ea61441"`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" DROP CONSTRAINT "FK_4b0a9d9c500235552447e4cfdd1"`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" DROP COLUMN "orgIdId"`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" ADD "orgId" integer`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" ADD CONSTRAINT "FK_db1aa6ff5bb5c71582a9bf587d6" FOREIGN KEY ("userId") REFERENCES "auth-user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" ADD CONSTRAINT "FK_3e0642ef4d9a65403275bea944e" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth-org-role" DROP CONSTRAINT "FK_3e0642ef4d9a65403275bea944e"`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" DROP CONSTRAINT "FK_db1aa6ff5bb5c71582a9bf587d6"`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" DROP COLUMN "orgId"`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" ADD "orgIdId" integer`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" ADD CONSTRAINT "FK_4b0a9d9c500235552447e4cfdd1" FOREIGN KEY ("orgIdId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth-org-role" ADD CONSTRAINT "FK_d383dc1f7e79ee0042b2ea61441" FOREIGN KEY ("userIdId") REFERENCES "auth-user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
