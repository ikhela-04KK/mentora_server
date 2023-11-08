//  creation du data transfert object pour valider donné dans le signUp

import { IsEmail, IsString } from 'class-validator';

export class loginDto {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
