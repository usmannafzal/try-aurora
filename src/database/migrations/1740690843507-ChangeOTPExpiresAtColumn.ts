import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeOTPExpiresAtColumn1740690843507 implements MigrationInterface {
    name = 'ChangeOTPExpiresAtColumn1740690843507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "otp_expires_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "otp_expires_at" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "otp_expires_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "otp_expires_at" SET NOT NULL`);
    }

}
