import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MatchService } from './match.service';
import { MATCH_PATTERNS } from '@app/common/patterns';

@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) { }

  @MessagePattern(MATCH_PATTERNS.FIND_MATCHES_BY_USER)
  findMatchesByUser(@Payload() userId: number) {
    return this.matchService.findByUser(userId);
  }

  @MessagePattern(MATCH_PATTERNS.FIND_MATCH_BY_ID)
  findOne(@Payload() id: number) {
    return this.matchService.findOne(id);
  }
}