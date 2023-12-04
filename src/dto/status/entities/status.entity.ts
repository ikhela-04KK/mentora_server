import { User } from '../../../user/dto/dto/user.entity';

export class Status {
  id: number;

  connect_at: Date;

  disconnect_at: Date;

  user_id: number;

  user?: User;
  isOnline: boolean;
}
