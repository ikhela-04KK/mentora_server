import { IsDateString, IsOptional } from 'class-validator';

export class UpdateStatusDto {
  @IsOptional()
  @IsDateString()
  connect_at?: Date;

  @IsOptional()
  @IsDateString()
  disconnect_at?: Date;
}
