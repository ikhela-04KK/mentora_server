import { IsEmail, IsEnum, IsString } from 'class-validator';

enum UserRole {
  ADMIN = 'ADMIN',
  INVITE = 'INVITE',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}
export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  avatar: string;
}
