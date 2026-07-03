import { Controller, Get } from '@nestjs/common';
import { MensajeriaService } from './mensajeria.service';

@Controller()
export class MensajeriaController {
  constructor(private readonly mensajeriaService: MensajeriaService) {}

  @Get()
  getHello(): string {
    return this.mensajeriaService.getHello();
  }
}
