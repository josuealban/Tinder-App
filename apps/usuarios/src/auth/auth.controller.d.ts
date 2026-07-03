import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        id: number;
        createdAt: Date;
        email: string;
        password: string;
        phone: string | null;
        name: string;
        age: number;
        bio: string | null;
        weight: number | null;
        height: number | null;
        nationality: string | null;
        gender: import("@prisma/client").$Enums.Gender | null;
        city: string | null;
        country: string | null;
        role: import("@prisma/client").$Enums.Role;
        zodiacSign: string | null;
        seeking: string | null;
        location: string | null;
        job: string | null;
        hobbies: string[];
        spotifyId: string | null;
        musicList: string[];
        subscription: import("@prisma/client").$Enums.SubscriptionTier;
        donationsEnabled: boolean;
        isRestricted: boolean;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
