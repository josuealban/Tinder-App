import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async create(createChatDto: CreateChatDto) {
    return this.prisma.chat.create({
      data: createChatDto,
    });
  }

  async findAll() {
    return this.prisma.chat.findMany({
      include: {
        match: {
          include: {
            user1: { select: { id: true, name: true } },
            user2: { select: { id: true, name: true } },
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async findOne(id: number) {
    const chat = await this.prisma.chat.findUnique({
      where: { id },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
        match: {
          include: {
            user1: { select: { id: true, name: true } },
            user2: { select: { id: true, name: true } },
          },
        },
      },
    });
    if (!chat) throw new NotFoundException(`Chat con id ${id} no encontrado`);
    return chat;
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    await this.findOne(id); // Verifica que existe
    return this.prisma.chat.update({
      where: { id },
      data: updateChatDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica que existe
    return this.prisma.chat.delete({
      where: { id },
    });
  }
}

