import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Delete,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { JwtModule } from '@nestjs/jwt';
import { CheckUserTokenMiddleware } from './common/middlewares/check-user-token.middleware';
import { VerifyAdminMiddleware } from './common/middlewares/verify-admin.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckUserTokenMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.ALL });
    consumer
      .apply(VerifyAdminMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.DELETE });
  }
}
