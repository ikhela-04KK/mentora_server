
import {ApiProperty} from '@nestjs/swagger'


export class ChatsDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty()
name: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
created_at: Date ;
}
