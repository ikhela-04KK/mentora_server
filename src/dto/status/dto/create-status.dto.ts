
import {ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsNotEmpty} from 'class-validator'




export class CreateStatusDto {
  @ApiProperty({
  type: 'string',
  format: 'date-time',
})
@IsNotEmpty()
@IsDateString()
connect_at: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
@IsNotEmpty()
@IsDateString()
disconnect_at: Date ;
}
