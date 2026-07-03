import { PrismaService } from '../../../../dist/src/prisma/prisma.service.js';
import { SubscriptionTier } from '../../../../dist/src/domain/enums/subscription-tier.enum.js';
import { CreateSubscriptionDto } from './dto/create-subscription.dto.js';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto.js';
export declare class SubscriptionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<{
        createdAt: Date;
        name: string;
        updatedAt: Date;
        tier: import("@prisma/client").$Enums.SubscriptionTier;
        description: string;
        price: number;
        features: string[];
    }>;
    findAll(): Promise<{
        createdAt: Date;
        name: string;
        updatedAt: Date;
        tier: import("@prisma/client").$Enums.SubscriptionTier;
        description: string;
        price: number;
        features: string[];
    }[]>;
    findOne(tier: SubscriptionTier): Promise<{
        createdAt: Date;
        name: string;
        updatedAt: Date;
        tier: import("@prisma/client").$Enums.SubscriptionTier;
        description: string;
        price: number;
        features: string[];
    }>;
    update(tier: SubscriptionTier, updateSubscriptionDto: UpdateSubscriptionDto): Promise<{
        createdAt: Date;
        name: string;
        updatedAt: Date;
        tier: import("@prisma/client").$Enums.SubscriptionTier;
        description: string;
        price: number;
        features: string[];
    }>;
    remove(tier: SubscriptionTier): Promise<{
        createdAt: Date;
        name: string;
        updatedAt: Date;
        tier: import("@prisma/client").$Enums.SubscriptionTier;
        description: string;
        price: number;
        features: string[];
    }>;
}
