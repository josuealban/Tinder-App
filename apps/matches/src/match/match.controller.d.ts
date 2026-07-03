import { MatchService } from './match.service.js';
import { CreateMatchDto } from './dto/create-match.dto.js';
import { UpdateMatchDto } from './dto/update-match.dto.js';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    create(createMatchDto: CreateMatchDto): Promise<{
        chat: {
            id: number;
            createdAt: Date;
            matchId: number;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        user1Id: number;
        user2Id: number;
    }>;
    findAll(): Promise<({
        chat: {
            id: number;
            createdAt: Date;
            matchId: number;
        } | null;
        user1: {
            id: number;
            name: string;
            photos: {
                id: number;
                createdAt: Date;
                url: string;
                isPrimary: boolean;
                userId: number;
            }[];
        };
        user2: {
            id: number;
            name: string;
            photos: {
                id: number;
                createdAt: Date;
                url: string;
                isPrimary: boolean;
                userId: number;
            }[];
        };
    } & {
        id: number;
        createdAt: Date;
        user1Id: number;
        user2Id: number;
    })[]>;
    findOne(id: number): Promise<{
        chat: {
            id: number;
            createdAt: Date;
            matchId: number;
        } | null;
        user1: {
            id: number;
            name: string;
            photos: {
                id: number;
                createdAt: Date;
                url: string;
                isPrimary: boolean;
                userId: number;
            }[];
        };
        user2: {
            id: number;
            name: string;
            photos: {
                id: number;
                createdAt: Date;
                url: string;
                isPrimary: boolean;
                userId: number;
            }[];
        };
    } & {
        id: number;
        createdAt: Date;
        user1Id: number;
        user2Id: number;
    }>;
    findByUser(userId: number): Promise<({
        chat: {
            id: number;
            createdAt: Date;
            matchId: number;
        } | null;
        user1: {
            id: number;
            name: string;
            photos: {
                id: number;
                createdAt: Date;
                url: string;
                isPrimary: boolean;
                userId: number;
            }[];
        };
        user2: {
            id: number;
            name: string;
            photos: {
                id: number;
                createdAt: Date;
                url: string;
                isPrimary: boolean;
                userId: number;
            }[];
        };
    } & {
        id: number;
        createdAt: Date;
        user1Id: number;
        user2Id: number;
    })[]>;
    update(id: number, updateMatchDto: UpdateMatchDto): Promise<{
        id: number;
        createdAt: Date;
        user1Id: number;
        user2Id: number;
    }>;
    updatePut(id: number, updateMatchDto: UpdateMatchDto): Promise<{
        id: number;
        createdAt: Date;
        user1Id: number;
        user2Id: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        user1Id: number;
        user2Id: number;
    }>;
}
