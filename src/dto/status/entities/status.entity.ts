
import {ApiProperty} from '@nestjs/swagger'
import {User} from '../../user/entities/user.entity'


export class Status {
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
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
user_id: number ;
@ApiProperty({
  type: () => User,
  required: false,
})
user?: User ;
@ApiProperty()
isOnline: boolean ;
}
