import { MigrationInterface, QueryRunner } from "typeorm";

// note: consider using the typeorm migration API - queryRunner.createTable - https://orkhan.gitbook.io/typeorm/docs/migrations#using-migration-api-to-write-migrations

export class Initial1694598133000 implements MigrationInterface {
    name = 'Initial1694598133000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "name" character varying(80) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
