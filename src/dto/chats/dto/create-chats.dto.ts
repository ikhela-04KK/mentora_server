import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChatsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  id: number;
}

export class CreateChatsWithMessagDto{

  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  to: number;
}
