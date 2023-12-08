import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessagesDto {
  @IsNumber()
  chat_id: number;

  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
