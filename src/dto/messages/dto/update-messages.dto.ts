import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateMessagesDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsDateString()
  seen_at?: Date | null;

  @IsOptional()
  @IsDateString()
  delivered_at?: Date | null;
}
