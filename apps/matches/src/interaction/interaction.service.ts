import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import { InteractionType } from '../domain/enums/interaction-type.enum';
import { ClientProxy } from '@nestjs/microservices';
import { EVENTS } from '@app/common/patterns';

@Injectable()
export class InteractionService {
  constructor(
    private prisma: PrismaService,
    @Inject('MENSAJERIA_SERVICE') private mensajeriaClient: ClientProxy,
  ) {}

  async create(createInteractionDto: CreateInteractionDto) {
    const { fromId, toId, type } = createInteractionDto;

    if (fromId === toId) {
      throw new ConflictException('User cannot interact with themselves');
    }

    const { interaction, matchCreated } = await this.prisma.$transaction(async (tx) => {
      const newInteraction = await tx.interaction.create({
        data: { fromId, toId, type },
      });

      let match: { id: number; user1Id: number; user2Id: number } | null = null;

      if (type === InteractionType.LIKE || type === InteractionType.SUPERLIKE) {
        const reciprocal = await tx.interaction.findFirst({
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
          match = await tx.match.create({
            data: {
              user1Id: Math.min(fromId, toId),
              user2Id: Math.max(fromId, toId),
            },
          });
        }
      }

      return { interaction: newInteraction, matchCreated: match };
    });

    if (matchCreated) {
      this.mensajeriaClient.emit(EVENTS.MATCH_CREATED, { matchId: matchCreated.id, user1Id: matchCreated.user1Id, user2Id: matchCreated.user2Id });
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

  async replace(id: number, data: UpdateInteractionDto) {
    return this.prisma.interaction.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.interaction.delete({
      where: { id },
    });
  }
}
