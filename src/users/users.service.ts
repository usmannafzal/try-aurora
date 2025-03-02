import { BadRequestException, Injectable, Param } from '@nestjs/common';
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

  async delete(request: any, id: string) {
    if (!id) throw new BadRequestException('User Id is missing');

    if (id === request.user.id)
      throw new BadRequestException('User cannot delete its own records');

    const user = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!user)
      throw new BadRequestException("The user with given Id doesn't exists");

    this.repo.softDelete(user);
  }
}
