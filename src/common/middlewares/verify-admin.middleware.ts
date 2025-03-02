import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/user.entity';

interface CustomRequest extends Request {
  user?: User;
}

@Injectable()
export class VerifyAdminMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: () => void) {
    if (!req.user.isAdmin)
      return res.status(401).json({
        message:
          "Unauthorized: The user doesn't have the access to delete the user",
      });
    next();
  }
}
