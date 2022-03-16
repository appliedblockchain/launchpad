import {MigrationInterface, QueryRunner} from "typeorm";

const USER_TABLE_NAME = "user_entity";

export class SyncPassword1647434507949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (await queryRunner.hasColumn(USER_TABLE_NAME, "password")) {
            console.warn(`Already got "password" field on "user" table, exiting migration..`);
            return;
        }
        queryRunner.query(`ALTER TABLE ${USER_TABLE_NAME} ADD COLUMN password VARCHAR`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        if (!await queryRunner.hasColumn(USER_TABLE_NAME, "password")) {
            console.warn('No "password" field on "user" table, exiting revert of migration..');
            return;
        }
        queryRunner.query(`ALTER TABLE ${USER_TABLE_NAME} DROP COLUMN password`);
    }

}
