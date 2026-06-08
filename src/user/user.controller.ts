import { Controller, Get, Post, Body, Patch, Put, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser, AuthenticatedUser } from '../auth/decorators/current-user.decorator.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../auth/enums/role.enum.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  getProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.userService.findOne(user.userId);
  }

  @Get('stats/by-country')
  @Roles(Role.ADMIN)
  getStatsByCountry() {
    return this.userService.getStatsByCountry();
  }

  @Get('search/derived')
  findDerived(
    @Query('minAge') minAge?: string,
    @Query('maxAge') maxAge?: string,
    @Query('country') country?: string,
  ) {
    const min = minAge ? parseInt(minAge, 10) : 18;
    const max = maxAge ? parseInt(maxAge, 10) : 99;
    return this.userService.findDerived(min, max, country);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Put(':id')
  updatePut(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
