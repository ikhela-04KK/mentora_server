
import {ApiProperty} from '@nestjs/swagger'


export class StatusDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
connect_at: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
disconnect_at: Date ;
@ApiProperty()
isOnline: boolean ;
}
