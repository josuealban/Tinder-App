import { Controller, Get, Post, Body, Patch, Put, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PhotoService } from './photo.service.js';
import { CreatePhotoDto } from './dto/create-photo.dto.js';
import { UpdatePhotoDto } from './dto/update-photo.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../auth/enums/role.enum.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.photoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.photoService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.photoService.findByUser(userId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photoService.update(id, updatePhotoDto);
  }

  @Put(':id')
  updatePut(@Param('id', ParseIntPipe) id: number, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photoService.update(id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.photoService.remove(id);
  }
}
