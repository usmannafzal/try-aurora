import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: 0 })
  credits: number;

  @Column({ nullable: true })
  otp: number;

  @CreateDateColumn({
    name: 'otp_expires_at',
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP + INTERVAL '5 minutes'",
  })
  otpExpiresAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
