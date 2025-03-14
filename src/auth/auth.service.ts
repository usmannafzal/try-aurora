import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateEmailDto } from './dtos/create-email.dto';
import { UsersService } from '../users/users.service';
import { ValidateOTPDto } from './dtos/validate-otp.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private generateOTP(): number {
    return Number(
      Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join(''),
    );
  }

  async create(body: CreateEmailDto) {
    return this.usersService.create(body, this.generateOTP());
  }

  async validateOTP(body: ValidateOTPDto) {
    const user = await this.repo.findOne({ where: { email: body.email } });
    if (!user) throw new NotFoundException();

    const now = new Date(new Date().toISOString());
    const userOTPExpiryTime = new Date(user.otpExpiresAt);
    if (now > userOTPExpiryTime)
      throw new BadRequestException('OTP has been expired');

    if (user.otp !== body.otp)
      throw new BadRequestException('The OTP is incorrect');

    const accessToken = await this.jwtService.signAsync({ user });

    return {
      user,
      accessToken,
    };
  }
}
