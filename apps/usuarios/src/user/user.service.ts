import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const {
      email, password, phone, name, age,
      ...profileData
    } = createUserDto;
    return this.prisma.user.create({
      data: {
        email,
        password,
        phone,
        name,
        age,
        profile: {
          create: {
            ...profileData,
            hobbies: profileData.hobbies || [],
            musicList: profileData.musicList || [],
          }
        }
      },
      include: {
        profile: true,
        photos: true,
      }
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { profile: true, photos: true }
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: { profile: true, photos: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true, photos: true },
    });
    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: `Usuario con id ${id} no encontrado`,
      });
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const {
      email, password, phone, name, age,
      ...profileData
    } = updateUserDto;
    return this.prisma.user.update({
      where: { id },
      data: {
        email,
        password,
        phone,
        name,
        age,
        profile: {
          upsert: {
            create: { ...profileData, hobbies: profileData.hobbies ?? [], musicList: profileData.musicList ?? [] },
            update: profileData,
          }
        }
      },
      include: {
        profile: true,
        photos: true,
      }
    });
  }

  async replace(id: number, replaceUserDto: UpdateUserDto) {
    await this.findOne(id);
    const {
      email, password, phone, name, age,
      ...profileData
    } = replaceUserDto;
    return this.prisma.user.update({
      where: { id },
      data: {
        email,
        password,
        phone,
        name,
        age,
        profile: {
          upsert: {
            create: { ...profileData, hobbies: profileData.hobbies || [], musicList: profileData.musicList || [] },
            update: { ...profileData, hobbies: profileData.hobbies || [], musicList: profileData.musicList || [] },
          }
        }
      },
      include: {
        profile: true,
        photos: true,
      }
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.profile.deleteMany({ where: { userId: id } });
    await this.prisma.photo.deleteMany({ where: { userId: id } });
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
        profile: country ? {
          country: {
            equals: country,
            mode: 'insensitive',
          }
        } : undefined,
      },
      include: {
        profile: true,
        photos: true,
      },
    });
  }

  async getStatsByCountry() {
    return this.prisma.$queryRaw`
      SELECT country, COUNT(*)::int as count
      FROM "Profile"
      WHERE country IS NOT NULL
      GROUP BY country
      ORDER BY count DESC
    `;
  }
}
