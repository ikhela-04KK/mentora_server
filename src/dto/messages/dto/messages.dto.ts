import { IsString, IsDate } from 'class-validator';

export class MessagesDto {
  id: number;

  @IsString()
  content: string;

  @IsDate()
  seen_at: Date | null;

  @IsDate()
  delivered_at: Date | null;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}
