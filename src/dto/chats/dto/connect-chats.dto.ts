import { IsInt, IsNotEmpty } from 'class-validator';

export class ConnectChatsDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
