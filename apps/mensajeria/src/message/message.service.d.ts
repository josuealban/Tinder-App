import { PrismaService } from '../../../../dist/src/prisma/prisma.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { UpdateMessageDto } from './dto/update-message.dto.js';
export declare class MessageService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createMessageDto: CreateMessageDto): Promise<{
        id: number;
        fromId: number;
        createdAt: Date;
        content: string;
        chatId: number;
    }>;
    findAll(): Promise<({
        fromUser: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        fromId: number;
        createdAt: Date;
        content: string;
        chatId: number;
    })[]>;
    findOne(id: number): Promise<{
        fromUser: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        fromId: number;
        createdAt: Date;
        content: string;
        chatId: number;
    }>;
    findByChat(chatId: number): Promise<{
        id: number;
        fromId: number;
        createdAt: Date;
        content: string;
        chatId: number;
    }[]>;
    update(id: number, updateMessageDto: UpdateMessageDto): Promise<{
        id: number;
        fromId: number;
        createdAt: Date;
        content: string;
        chatId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        fromId: number;
        createdAt: Date;
        content: string;
        chatId: number;
    }>;
}
