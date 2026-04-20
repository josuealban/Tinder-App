import { Controller, Get, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service.js';
import { SubscriptionTier } from '../domain/enums/subscription-tier.enum.js';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async findAll() {
    return this.subscriptionService.findAll();
  }

  @Get(':tier')
  async findOne(@Param('tier') tier: SubscriptionTier) {
    return this.subscriptionService.findOne(tier);
  }
}
