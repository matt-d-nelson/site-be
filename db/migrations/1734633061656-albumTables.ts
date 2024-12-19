import { MigrationInterface, QueryRunner } from "typeorm";

export class AlbumTables1734633061656 implements MigrationInterface {
    name = 'AlbumTables1734633061656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "album" ("id" SERIAL NOT NULL, "isDraft" boolean NOT NULL DEFAULT true, "name" character varying, "description" text, "coverArtUrl" character varying, "coverArtId" character varying, "releaseDate" character varying, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album-owners" ("id" SERIAL NOT NULL, "orgId" integer, "albumId" integer, CONSTRAINT "PK_7a599a18f9e04470d97b6f26e8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album-track" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lyrics" text NOT NULL, "audioUrl" character varying NOT NULL, "audioId" character varying NOT NULL, "trackPlacement" integer NOT NULL, "albumId" integer, CONSTRAINT "PK_29df0a9e04d6104956aa8a3188e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "album-owners" ADD CONSTRAINT "FK_2219197624e7751dc56912043e7" FOREIGN KEY ("orgId") REFERENCES "auth-org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album-owners" ADD CONSTRAINT "FK_069754bb2ce6ea7aede074277b8" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album-track" ADD CONSTRAINT "FK_bc12f8896bafdf0959f63ddb313" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album-track" DROP CONSTRAINT "FK_bc12f8896bafdf0959f63ddb313"`);
        await queryRunner.query(`ALTER TABLE "album-owners" DROP CONSTRAINT "FK_069754bb2ce6ea7aede074277b8"`);
        await queryRunner.query(`ALTER TABLE "album-owners" DROP CONSTRAINT "FK_2219197624e7751dc56912043e7"`);
        await queryRunner.query(`DROP TABLE "album-track"`);
        await queryRunner.query(`DROP TABLE "album-owners"`);
        await queryRunner.query(`DROP TABLE "album"`);
    }

}
