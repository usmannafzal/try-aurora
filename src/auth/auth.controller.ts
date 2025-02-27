import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { GenerateOTPInterceptor } from './interceptors/generate-otp.interceptor';
import { ValidateOTPDto } from './dtos/validate-otp.dto';
import { ValidateOtpInterceptor } from './interceptors/validate-otp.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(GenerateOTPInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('otp/generate')
  generateOTP(@Body() body: CreateUserDto) {
    return this.authService.create(body);
  }

  @UseInterceptors(ValidateOtpInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('otp/validate')
  validateOtp(@Body() body: ValidateOTPDto) {
    return this.authService.validateOTP(body);
  }
}
