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
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CheckUserTokenMiddleware } from './common/middlewares/check-user-token.middleware';
import { VerifyAdminMiddleware } from './common/middlewares/verify-admin.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '7d' },
        };
      },
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
