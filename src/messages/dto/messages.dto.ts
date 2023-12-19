
import {ApiProperty} from '@nestjs/swagger'


export class MessagesDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty()
content: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
seen_at: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
delivered_at: Date  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
created_at: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updated_at: Date ;
}
