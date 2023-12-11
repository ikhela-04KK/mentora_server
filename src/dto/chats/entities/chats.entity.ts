import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Messages } from 'src/messages/entities/messages.entity';

export class Chats {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  created_at: Date;
  @ApiProperty({
    type: () => Messages,
    isArray: true,
    required: false,
  })
  Messages?: Messages[];
  @ApiProperty({
    type: () => User,
    isArray: true,
    required: false,
  })
  users?: User[];
}
