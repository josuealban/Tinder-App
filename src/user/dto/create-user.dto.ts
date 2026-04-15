import { Gender } from '../../domain/enums/gender.enum';
import { SubscriptionTier } from '../../domain/enums/subscription-tier.enum';

export class CreateUserDto {
  email: string;
  password: string;
  phone?: string;
  name: string;
  age: number;
  bio?: string;
  weight?: number;
  height?: number;
  nationality?: string;
  gender?: Gender;
  city?: string;
  country?: string;
  zodiacSign?: string;
  seeking?: string;
  location?: string;
  job?: string;
  hobbies?: string[];
  spotifyId?: string;
  musicList?: string[];
  subscription?: SubscriptionTier;
}
