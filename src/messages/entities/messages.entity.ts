import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/dto/dto/user.entity';
import { Chats } from 'src/chats/entities/chat.entity';

export class Messages {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty()
  content: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  seen_at: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  delivered_at: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  created_at: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updated_at: Date;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  user_id: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  chat_id: number;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user?: User;
  @ApiProperty({
    type: () => Chats,
    required: false,
  })
  chat?: Chats;
}
