import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { GenerateOTPInterceptor } from './interceptors/auth/generate-otp.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(GenerateOTPInterceptor)
  @Post('otp/generate')
  generateOTP(@Body() body: CreateUserDto) {
    return this.authService.create(body);
  }
}
