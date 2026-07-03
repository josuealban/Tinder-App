import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateInteractionDto } from './dto/create-interaction.dto.js';
import { UpdateInteractionDto } from './dto/update-interaction.dto.js';
import { InteractionType } from '../domain/enums/interaction-type.enum.js';

@Injectable()
export class InteractionService {
  constructor(private prisma: PrismaService) {}

  async create(createInteractionDto: CreateInteractionDto) {
    const { fromId, toId, type } = createInteractionDto;

    if (fromId === toId) {
      throw new ConflictException('User cannot interact with themselves');
    }

    const interaction = await this.prisma.interaction.create({
      data: { fromId, toId, type },
    });

    if (type === InteractionType.LIKE || type === InteractionType.SUPERLIKE) {
      const reciprocal = await this.prisma.interaction.findFirst({
        where: {
          fromId: toId,
          toId: fromId,
          OR: [
            { type: InteractionType.LIKE },
            { type: InteractionType.SUPERLIKE },
          ],
        },
      });

      if (reciprocal) {
        await this.prisma.match.create({
          data: {
            user1Id: Math.min(fromId, toId),
            user2Id: Math.max(fromId, toId),
            chat: { create: {} },
          },
        });
      }
    }

    return interaction;
  }

  async findAll() {
    return this.prisma.interaction.findMany();
  }

  async findByUser(userId: number) {
    return this.prisma.interaction.findMany({
      where: {
        OR: [{ fromId: userId }, { toId: userId }],
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.interaction.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateInteractionDto: UpdateInteractionDto) {
    return this.prisma.interaction.update({
      where: { id },
      data: updateInteractionDto,
    });
  }

  async remove(id: number) {
    return this.prisma.interaction.delete({
      where: { id },
    });
  }
}
