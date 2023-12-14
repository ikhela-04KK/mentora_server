import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMessagesDto {
  @IsNumber()
  chat_id: number;

  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsDateString()
  seen_at?: string;

  @IsOptional()
  @IsDateString()
  delivered_at?: string;
}
