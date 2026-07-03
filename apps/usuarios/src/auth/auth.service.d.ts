import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
import { User } from '@prisma/client';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
type UserWithoutPassword = Omit<User, 'password'>;
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<UserWithoutPassword | null>;
    login(user: UserWithoutPassword): Promise<{
        access_token: string;
    }>;
    register(data: CreateUserDto): Promise<{
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
}
export { };
