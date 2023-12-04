import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class StatusDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsDateString()
  connect_at: Date;

  @IsOptional()
  @IsDateString()
  disconnect_at: Date;

  @IsBoolean()
  isOnline: boolean;
}
