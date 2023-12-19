
import {UserRole} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class UserDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty()
email: string ;
@ApiProperty()
password: string ;
@ApiProperty()
name: string ;
@ApiProperty({
  enum: UserRole,
})
role: UserRole ;
@ApiProperty()
avatar: string ;
@ApiProperty()
location: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt: Date ;
}
