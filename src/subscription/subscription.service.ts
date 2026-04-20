import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { SubscriptionTier } from '../domain/enums/subscription-tier.enum.js';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.subscriptionPlan.findMany();
  }

  async findOne(tier: SubscriptionTier) {
    return this.prisma.subscriptionPlan.findUnique({
      where: { tier },
    });
  }
}
