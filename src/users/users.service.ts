import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(body: CreateUserDto, otp: number) {
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expiry time in 5 minutes

    let user = await this.repo.findOne({ where: { email: body.email } });

    if (!user) {
      user = this.repo.create({ email: body.email, otp, otpExpiresAt });
    } else {
      Object.assign(user, { otp, otpExpiresAt });
    }

    return this.repo.save(user);
  }

  delete(request: Request) {}
}
