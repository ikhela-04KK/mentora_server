import { IsInt, IsNotEmpty } from 'class-validator';

export class ConnectStatusDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
