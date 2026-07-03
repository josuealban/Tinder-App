import { InteractionService } from './interaction.service.js';
import { CreateInteractionDto } from './dto/create-interaction.dto.js';
import { UpdateInteractionDto } from './dto/update-interaction.dto.js';
export declare class InteractionController {
    private readonly interactionService;
    constructor(interactionService: InteractionService);
    create(createInteractionDto: CreateInteractionDto): Promise<{
        id: number;
        type: import("@prisma/client").$Enums.InteractionType;
        fromId: number;
        toId: number;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        type: import("@prisma/client").$Enums.InteractionType;
        fromId: number;
        toId: number;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        type: import("@prisma/client").$Enums.InteractionType;
        fromId: number;
        toId: number;
        createdAt: Date;
    } | null>;
    findByUser(userId: number): Promise<{
        id: number;
        type: import("@prisma/client").$Enums.InteractionType;
        fromId: number;
        toId: number;
        createdAt: Date;
    }[]>;
    update(id: number, updateInteractionDto: UpdateInteractionDto): Promise<{
        id: number;
        type: import("@prisma/client").$Enums.InteractionType;
        fromId: number;
        toId: number;
        createdAt: Date;
    }>;
    updatePut(id: number, updateInteractionDto: UpdateInteractionDto): Promise<{
        id: number;
        type: import("@prisma/client").$Enums.InteractionType;
        fromId: number;
        toId: number;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        type: import("@prisma/client").$Enums.InteractionType;
        fromId: number;
        toId: number;
        createdAt: Date;
    }>;
}
