import { IsDefined, IsEmail, IsNumber } from 'class-validator';

export class ValidateOTPDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNumber()
  otp: number;
}
