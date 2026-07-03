import { Module } from '@nestjs/common';
import { MensajeriaController } from './mensajeria.controller';
import { MensajeriaService } from './mensajeria.service';

@Module({
  imports: [],
  controllers: [MensajeriaController],
  providers: [MensajeriaService],
})
export class MensajeriaModule {}
