import { ChatService } from './chat.service.js';
import { CreateChatDto } from './dto/create-chat.dto.js';
import { UpdateChatDto } from './dto/update-chat.dto.js';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatDto: CreateChatDto): Promise<{
        id: number;
        createdAt: Date;
        matchId: number;
    }>;
    findAll(): Promise<({
        match: {
            user1: {
                id: number;
                name: string;
            };
            user2: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            user1Id: number;
            user2Id: number;
        };
        messages: {
            id: number;
            fromId: number;
            createdAt: Date;
            content: string;
            chatId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        matchId: number;
    })[]>;
    findOne(id: number): Promise<{
        match: {
            user1: {
                id: number;
                name: string;
            };
            user2: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            user1Id: number;
            user2Id: number;
        };
        messages: {
            id: number;
            fromId: number;
            createdAt: Date;
            content: string;
            chatId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        matchId: number;
    }>;
    update(id: number, updateChatDto: UpdateChatDto): Promise<{
        id: number;
        createdAt: Date;
        matchId: number;
    }>;
    updatePut(id: number, updateChatDto: UpdateChatDto): Promise<{
        id: number;
        createdAt: Date;
        matchId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        matchId: number;
    }>;
}
