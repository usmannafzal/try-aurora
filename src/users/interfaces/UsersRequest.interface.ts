import { User } from '../user.entity';
import { Request } from 'express';

export default interface UsersRequest extends Request {
  user?: User;
}
