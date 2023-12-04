import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessagesDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsDate()
  seen_at?: Date;

  @IsOptional()
  @IsDate()
  delivered_at?: Date;
}
