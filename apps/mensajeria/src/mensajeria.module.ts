import { Module } from '@nestjs/common';
import { ChatModule } from '../../tindel/src/chat/chat.module';
import { MessageModule } from '../../tindel/src/message/message.module';

@Module({
  imports: [ChatModule, MessageModule],
})
export class MensajeriaModule {}
