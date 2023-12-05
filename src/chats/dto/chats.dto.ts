import { IsDate, IsInt, IsString } from 'class-validator';

export class ChatsDto {
  @IsInt()
  id: number;
  @IsString()
  name: string;
  @IsDate()
  created_at: Date;
}
