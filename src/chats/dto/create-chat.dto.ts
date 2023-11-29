import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsDate()
  created_at: Date;
}
