import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateStatusDto {
  @IsNotEmpty()
  @IsDateString()
  connect_at: Date;

  @IsNotEmpty()
  @IsDateString()
  disconnect_at: Date;
}
