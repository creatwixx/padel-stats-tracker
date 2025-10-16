import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './config/app.module';
import { DataSource } from 'typeorm';
import { seed } from './seeds/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
  console.log('Application started, DB synchronized.');

  if (process.env.NODE_ENV !== 'production') {
    try {
      console.log('Running seed...');
      const dataSource = app.get(DataSource);
      await seed(dataSource);
      console.log('Seed completed successfully!');
    } catch (err) {
      console.error('Seeding failed:', err);
    }
  }
}

void bootstrap();
