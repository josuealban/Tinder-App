import { NestFactory } from '@nestjs/core';
import { MensajeriaModule } from './mensajeria.module';

async function bootstrap() {
  const app = await NestFactory.create(MensajeriaModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
