import { SubscriptionTier } from '../../../../../dist/src/domain/enums/subscription-tier.enum';
export declare class CreateSubscriptionDto {
    tier: SubscriptionTier;
    name: string;
    description: string;
    price: number;
    features: string[];
}
