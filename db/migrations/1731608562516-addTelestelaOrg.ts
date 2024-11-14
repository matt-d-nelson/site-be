import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTelestelaOrg1731608562516 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "auth-org" (id, name) VALUES
            (12356, 'Telestela'),
            (67890, 'Matt');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "auth-org" WHERE id IN (12356, 67890);
        `);
    }
}
