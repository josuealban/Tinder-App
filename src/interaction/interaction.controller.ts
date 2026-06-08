import { Controller, Get, Post, Body, Patch, Put, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InteractionService } from './interaction.service.js';
import { CreateInteractionDto } from './dto/create-interaction.dto.js';
import { UpdateInteractionDto } from './dto/update-interaction.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../auth/enums/role.enum.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('interactions')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @Post()
  create(@Body() createInteractionDto: CreateInteractionDto) {
    return this.interactionService.create(createInteractionDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.interactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.interactionService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.interactionService.findByUser(userId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInteractionDto: UpdateInteractionDto) {
    return this.interactionService.update(id, updateInteractionDto);
  }

  @Put(':id')
  updatePut(@Param('id', ParseIntPipe) id: number, @Body() updateInteractionDto: UpdateInteractionDto) {
    return this.interactionService.update(id, updateInteractionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.interactionService.remove(id);
  }
}
