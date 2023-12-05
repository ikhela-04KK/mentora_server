import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatsDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
