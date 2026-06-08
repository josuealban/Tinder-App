import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service.js';
import { SubscriptionTier } from '../domain/enums/subscription-tier.enum.js';
import { CreateSubscriptionDto } from './dto/create-subscription.dto.js';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../auth/enums/role.enum.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @Get()
  async findAll() {
    return this.subscriptionService.findAll();
  }

  @Get(':tier')
  async findOne(@Param('tier') tier: SubscriptionTier) {
    return this.subscriptionService.findOne(tier);
  }

  @Patch(':tier')
  @Roles(Role.ADMIN)
  update(@Param('tier') tier: SubscriptionTier, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionService.update(tier, updateSubscriptionDto);
  }

  @Put(':tier')
  @Roles(Role.ADMIN)
  updatePut(@Param('tier') tier: SubscriptionTier, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionService.update(tier, updateSubscriptionDto);
  }

  @Delete(':tier')
  @Roles(Role.ADMIN)
  remove(@Param('tier') tier: SubscriptionTier) {
    return this.subscriptionService.remove(tier);
  }
}
