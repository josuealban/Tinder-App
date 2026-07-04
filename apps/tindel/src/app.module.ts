import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { InteractionModule } from './interaction/interaction.module';
import { MatchModule } from './match/match.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { SubscriptionModule } from './subscription/subscription.module';

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
