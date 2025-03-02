import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Req() request: Request, @Param('id') id: string) {
    return this.usersService.delete(request, id);
  }
}
