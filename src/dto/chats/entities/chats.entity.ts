import { Messages } from '../../messages/entities/messages.entity';
import { User } from '../../../user/dto/dto/user.entity';

export class Chats {
  id: number;
  name: string;

  created_at: Date;

  Messages?: Messages[];

  users?: User[];
}
