import { InteractionType } from '../../../../../dist/src/domain/enums/interaction-type.enum';
export declare class CreateInteractionDto {
    type: InteractionType;
    fromId: number;
    toId: number;
}
