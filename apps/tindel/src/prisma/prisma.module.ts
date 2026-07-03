import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUsuariosService } from './prisma-usuarios.service';
import { PrismaMatchesService } from './prisma-matches.service';
import { PrismaMensajeriaService } from './prisma-mensajeria.service';

@Global()
@Module({
  providers: [
    PrismaService,
    PrismaUsuariosService,
    PrismaMatchesService,
    PrismaMensajeriaService,
  ],
  exports: [
    PrismaService,
    PrismaUsuariosService,
    PrismaMatchesService,
    PrismaMensajeriaService,
  ],
})
export class PrismaModule {}
