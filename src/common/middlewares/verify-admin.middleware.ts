import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import UsersRequest from 'src/users/interfaces/UsersRequest.interface';

@Injectable()
export class VerifyAdminMiddleware implements NestMiddleware {
  use(req: UsersRequest, res: Response, next: () => void) {
    if (!req.user.isAdmin)
      return res.status(401).json({
        message: "Unauthorized: The user doesn't have the admin access",
      });
    next();
  }
}
