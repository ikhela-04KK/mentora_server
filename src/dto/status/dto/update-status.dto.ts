
import {ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsOptional} from 'class-validator'




export class UpdateStatusDto {
  @ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
})
@IsOptional()
@IsDateString()
connect_at?: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
})
@IsOptional()
@IsDateString()
disconnect_at?: Date ;
}
