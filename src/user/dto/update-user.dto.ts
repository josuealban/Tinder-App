import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto implements Partial<CreateUserDto> {
  // All fields from CreateUserDto are optional here
  email?: string;
  phone?: string;
  name?: string;
  age?: number;
  bio?: string;
  weight?: number;
  height?: number;
  nationality?: string;
  gender?: import('../../domain/enums/gender.enum').Gender;
  city?: string;
  country?: string;
  zodiacSign?: string;
  seeking?: string;
  location?: string;
  job?: string;
  hobbies?: string[];
  spotifyId?: string;
  musicList?: string[];
  subscription?: import('../../domain/enums/subscription-tier.enum').SubscriptionTier;
}
