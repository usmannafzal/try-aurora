import { Controller, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete('delete')
  deleteUser(@Req() request: Request) {
    this.usersService.delete(request);
  }
}
