import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  id: number;
}
