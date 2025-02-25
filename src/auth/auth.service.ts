import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateEmailDto } from './create-email.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  #generateOTP(): number {
    return Number(
      Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join(''),
    );
  }

  async create(body: CreateEmailDto) {
    const user = await this.usersService.create(body);
    user.otp = this.#generateOTP();
    this.repo.save(user);
  }
}
