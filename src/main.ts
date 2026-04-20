import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validación global de DTOs: rechaza campos extra y valida tipos/formatos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Elimina campos no declarados en el DTO
      forbidNonWhitelisted: true, // Lanza error si llegan campos no permitidos
      transform: true,            // Convierte tipos automáticamente (string → number, etc.)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
