import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUsuariosService } from './prisma-usuarios.service';
import { PrismaMatchesService } from './prisma-matches.service';
import { PrismaMensajeriaService } from './prisma-mensajeria.service';

@Global()
@Module({
  providers: [
    PrismaService,           // BD original (compatibilidad)
    PrismaUsuariosService,   // BD: usuarios_db  → User, Photo
    PrismaMatchesService,    // BD: matches_db   → Interaction, Match
    PrismaMensajeriaService, // BD: mensajeria_db → SubscriptionPlan, Chat, Message
  ],
  exports: [
    PrismaService,
    PrismaUsuariosService,
    PrismaMatchesService,
    PrismaMensajeriaService,
  ],
})
export class PrismaModule {}
