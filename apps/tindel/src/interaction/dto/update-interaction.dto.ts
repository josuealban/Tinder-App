import { PartialType } from '@nestjs/mapped-types';
import { CreateInteractionDto } from './create-interaction.dto.js';

export class UpdateInteractionDto extends PartialType(CreateInteractionDto) {}
