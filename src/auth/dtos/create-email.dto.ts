import { IsDefined, IsEmail } from 'class-validator';

export class CreateEmailDto {
  @IsDefined()
  @IsEmail()
  email: string;
}
