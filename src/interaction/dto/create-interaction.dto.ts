import { InteractionType } from '../../domain/enums/interaction-type.enum';

export class CreateInteractionDto {
  type: InteractionType;
  fromId: number;
  toId: number;
}
