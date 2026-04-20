import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SubscriptionService } from './subscription.service.js';
import { SubscriptionTier } from '../domain/enums/subscription-tier.enum.js';
import { CreateSubscriptionDto } from './dto/create-subscription.dto.js';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto.js';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
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
  update(@Param('tier') tier: SubscriptionTier, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionService.update(tier, updateSubscriptionDto);
  }

  @Put(':tier')
  updatePut(@Param('tier') tier: SubscriptionTier, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionService.update(tier, updateSubscriptionDto);
  }

  @Delete(':tier')
  remove(@Param('tier') tier: SubscriptionTier) {
    return this.subscriptionService.remove(tier);
  }
}
