import { User } from '../../../user/dto/dto/user.entity';
import { Chats } from '../../chats/entities/chats.entity';

export class Messages {
  id: number;
  content: string;

  seen_at: Date | null;

  delivered_at: Date | null;

  created_at: Date;

  user_id: number;

  chat_id: number;

  user: User;

  chat: Chats;
}
