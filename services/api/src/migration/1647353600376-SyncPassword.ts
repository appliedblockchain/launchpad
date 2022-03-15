import {MigrationInterface, QueryRunner} from "typeorm";

export class SyncPassword1647353600376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (await queryRunner.hasColumn("user", "password")) {
            console.warn('Already got "password" field on "user" table, exiting migration..');
            return;
        }
        queryRunner.query('ALTER TABLE "user" ADD COLUMN password VARCHAR');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        if (!await queryRunner.hasColumn("user", "password")) {
            console.warn('No "password" field on "user" table, exiting revert of migration..');
            return;
        }
        queryRunner.query('ALTER TABLE "user" DROP COLUMN password');
    }
}
