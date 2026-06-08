import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        hobbies: createUserDto.hobbies || [],
        musicList: createUserDto.musicList || [],
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: { photos: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { photos: true },
    });
    if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findDerived(minAge: number, maxAge: number, country?: string) {
    return this.prisma.user.findMany({
      where: {
        age: {
          gte: minAge,
          lte: maxAge,
        },
        country: country ? {
          equals: country,
          mode: 'insensitive',
        } : undefined,
      },
      include: {
        photos: true,
      },
    });
  }

  async getStatsByCountry() {
    return this.prisma.$queryRawUnsafe(`
      SELECT country, COUNT(*)::int as count
      FROM "usuarios"."User"
      WHERE country IS NOT NULL
      GROUP BY country
      ORDER BY count DESC
    `);
  }
}

