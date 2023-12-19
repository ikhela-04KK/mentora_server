import { UserRole } from '@prisma/client';
import { Status } from '../../../dto/status/entities/status.entity';
import { Messages } from 'src/messages/entities/messages.entity';
import { Chats } from '../../../dto/chats/entities/chats.entity';

export class User {
  id: number;
  email: string;

  password: string;

  name: string;

  role: UserRole;

  avatar: string;

  location: string;

  createdAt: Date;

  statuses?: Status[];

  messages?: Messages[];

  chats?: Chats[];
}
