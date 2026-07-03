import { NestFactory } from '@nestjs/core';
import { MatchesModule } from './matches.module';

async function bootstrap() {
  const app = await NestFactory.create(MatchesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
