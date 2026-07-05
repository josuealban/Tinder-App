import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MESSAGE_PATTERNS } from '@app/common/patterns';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @MessagePattern(MESSAGE_PATTERNS.SEND_MESSAGE)
  create(@Payload() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @MessagePattern(MESSAGE_PATTERNS.GET_MESSAGES_BY_CHAT)
  findByChat(@Payload() chatId: number) {
    return this.messageService.findByChat(chatId);
  }
}
