import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../status/entities/status.entity';
import { Chats } from '../../chats/entities/chats.entity';
import { Messages } from 'src/messages/entities/messages.entity';

export class User {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  name: string;
  @ApiProperty({
    enum: UserRole,
  })
  role: UserRole;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  location: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: () => Status,
    isArray: true,
    required: false,
  })
  statuses?: Status[];
  @ApiProperty({
    type: () => Messages,
    isArray: true,
    required: false,
  })
  messages?: Messages[];
  @ApiProperty({
    type: () => Chats,
    isArray: true,
    required: false,
  })
  chats?: Chats[];
}
