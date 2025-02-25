import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @Column()
  email: string;

  @Column()
  credits: number;

  @Column()
  otp: number;

  @Column({ name: 'is_active' })
  isActive: number;
}
