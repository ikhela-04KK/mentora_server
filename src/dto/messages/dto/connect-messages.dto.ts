import { IsInt, IsNotEmpty } from 'class-validator';

export class ConnectMessagesDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
