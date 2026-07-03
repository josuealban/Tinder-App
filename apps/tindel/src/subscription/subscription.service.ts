import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { SubscriptionTier } from '../domain/enums/subscription-tier.enum.js';
import { CreateSubscriptionDto } from './dto/create-subscription.dto.js';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto.js';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.prisma.subscriptionPlan.create({
      data: createSubscriptionDto,
    });
  }

  async findAll() {
    return this.prisma.subscriptionPlan.findMany();
  }

  async findOne(tier: SubscriptionTier) {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { tier },
    });
    if (!plan) throw new NotFoundException(`Plan de suscripción ${tier} no encontrado`);
    return plan;
  }

  async update(tier: SubscriptionTier, updateSubscriptionDto: UpdateSubscriptionDto) {
    await this.findOne(tier);
    return this.prisma.subscriptionPlan.update({
      where: { tier },
      data: updateSubscriptionDto,
    });
  }

  async remove(tier: SubscriptionTier) {
    await this.findOne(tier);
    return this.prisma.subscriptionPlan.delete({
      where: { tier },
    });
  }
}
