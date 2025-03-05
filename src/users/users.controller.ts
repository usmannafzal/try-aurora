import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import UsersRequest from './interfaces/UsersRequest.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Req() request: UsersRequest, @Param('id') id: string) {
    return this.usersService.delete(request, id);
  }
}
