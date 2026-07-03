import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UserModule } from './user/user.module.js';
import { PhotoModule } from './photo/photo.module.js';
import { InteractionModule } from './interaction/interaction.module.js';
import { MatchModule } from './match/match.module.js';
import { ChatModule } from './chat/chat.module.js';
import { MessageModule } from './message/message.module.js';
import { AuthModule } from './auth/auth.module.js';
import { SubscriptionModule } from './subscription/subscription.module.js';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    PhotoModule,
    InteractionModule,
    MatchModule,
    ChatModule,
    MessageModule,
    AuthModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
