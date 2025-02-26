import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeOtpColumnTypeInUsersTable1740588589718 implements MigrationInterface {
    name = 'ChangeOtpColumnTypeInUsersTable1740588589718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "otp" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "otp" SET NOT NULL`);
    }

}
