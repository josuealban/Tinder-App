import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}

  async create(createMatchDto: CreateMatchDto) {
    return this.prisma.match.create({
      data: {
        user1Id: Math.min(createMatchDto.user1Id, createMatchDto.user2Id),
        user2Id: Math.max(createMatchDto.user1Id, createMatchDto.user2Id),
        chat: { create: {} },
      },
      include: { chat: true },
    });
  }

  async findAll() {
    return this.prisma.match.findMany({
      include: {
        user1: { select: { id: true, name: true, photos: true } },
        user2: { select: { id: true, name: true, photos: true } },
        chat: true,
      },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.match.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: { select: { id: true, name: true, photos: true } },
        user2: { select: { id: true, name: true, photos: true } },
        chat: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.match.findUnique({
      where: { id },
      include: {
        user1: { select: { id: true, name: true, photos: true } },
        user2: { select: { id: true, name: true, photos: true } },
        chat: true,
      },
    });
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    return this.prisma.match.update({
      where: { id },
      data: updateMatchDto,
    });
  }

  async remove(id: number) {
    return this.prisma.match.delete({
      where: { id },
    });
  }
}
