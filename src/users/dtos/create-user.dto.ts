import { IsDefined, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email: string;
}
