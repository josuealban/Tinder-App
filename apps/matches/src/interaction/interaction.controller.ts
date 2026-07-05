import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InteractionService } from './interaction.service';
import { MATCH_PATTERNS } from '@app/common/patterns';

@Controller()
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) { }

  @MessagePattern(MATCH_PATTERNS.CREATE_INTERACTION)
  create(@Payload() data: any) {
    return this.interactionService.create(data);
  }

  @MessagePattern(MATCH_PATTERNS.FIND_INTERACTIONS_BY_USER)
  findByUser(@Payload() userId: number) {
    return this.interactionService.findByUser(userId);
  }
}