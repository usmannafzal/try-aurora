import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsAdminColumnInUsersTable1740722661675 implements MigrationInterface {
    name = 'AddIsAdminColumnInUsersTable1740722661675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_admin"`);
    }

}
