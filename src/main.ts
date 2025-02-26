import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppDataSource from './database/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
}
bootstrap();
