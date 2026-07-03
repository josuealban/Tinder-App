"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let ChatService = class ChatService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createChatDto) {
        return this.prisma.chat.create({
            data: createChatDto,
        });
    }
    async findAll() {
        return this.prisma.chat.findMany({
            include: {
                match: {
                    include: {
                        user1: { select: { id: true, name: true } },
                        user2: { select: { id: true, name: true } },
                    },
                },
                messages: {
                    take: 1,
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
    }
    async findOne(id) {
        const chat = await this.prisma.chat.findUnique({
            where: { id },
            include: {
                messages: { orderBy: { createdAt: 'asc' } },
                match: {
                    include: {
                        user1: { select: { id: true, name: true } },
                        user2: { select: { id: true, name: true } },
                    },
                },
            },
        });
        if (!chat)
            throw new common_1.NotFoundException(`Chat con id ${id} no encontrado`);
        return chat;
    }
    async update(id, updateChatDto) {
        await this.findOne(id);
        return this.prisma.chat.update({
            where: { id },
            data: updateChatDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.chat.delete({
            where: { id },
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map