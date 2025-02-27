import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOTPExpiresAtColumn1740678088451 implements MigrationInterface {
    name = 'AddOTPExpiresAtColumn1740678088451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "otp_expires_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "otp_expires_at"`);
    }

}
