import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotoService {
  constructor(private prisma: PrismaService) {}

  async create(createPhotoDto: CreatePhotoDto) {
    return this.prisma.photo.create({
      data: createPhotoDto,
    });
  }

  async findAll() {
    return this.prisma.photo.findMany();
  }

  async findOne(id: number) {
    return this.prisma.photo.findUnique({
      where: { id },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.photo.findMany({
      where: { userId },
    });
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return this.prisma.photo.update({
      where: { id },
      data: updatePhotoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.photo.delete({
      where: { id },
    });
  }
}
