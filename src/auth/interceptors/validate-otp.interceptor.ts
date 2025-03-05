import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from 'src/users/user.entity';

@Injectable()
export class ValidateOtpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const user: User = data.user;
        return {
          ...data,
          user: {
            id: user.id,
            email: user.email,
            credits: user.credits,
            isAdmin: user.isAdmin,
          },
        };
      }),
    );
  }
}
