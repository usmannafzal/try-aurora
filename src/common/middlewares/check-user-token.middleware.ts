import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

interface CustomRequest extends Request {
  accessToken?: string;
  user?: any;
}

@Injectable()
export class CheckUserTokenMiddleware implements NestMiddleware {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  use(req: CustomRequest, res: Response, next: () => void) {
    const requestHeaders = req.headers['authorization'];

    if (!requestHeaders || !requestHeaders.startsWith('Bearer '))
      return res.status(401).json({ message: 'Unauthroized: Missing token' });

    const accessToken = requestHeaders.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(accessToken);
      req.accessToken = accessToken;
      req.user = decoded.user;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Invalid or expired token' });
    }
  }
}
