import { Module } from '@nestjs/common';
import { InteractionModule } from '../../tindel/src/interaction/interaction.module';
import { MatchModule } from '../../tindel/src/match/match.module';

@Module({
  imports: [InteractionModule, MatchModule],
})
export class MatchesModule {}
