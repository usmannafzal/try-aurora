import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(body: CreateUserDto, otp: number) {
    let user = await this.repo.findOne({ where: { email: body.email } });
    if (user) {
      user.otp = otp;
      return await this.repo.save(user);
    }

    user = new User();
    user.email = body.email;
    user.otp = otp;
    return this.repo.save(user);
  }
}
