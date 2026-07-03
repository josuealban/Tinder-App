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
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let MatchService = class MatchService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMatchDto) {
        return this.prisma.match.create({
            data: {
                user1Id: Math.min(createMatchDto.user1Id, createMatchDto.user2Id),
                user2Id: Math.max(createMatchDto.user1Id, createMatchDto.user2Id),
                chat: { create: {} },
            },
            include: { chat: true },
        });
    }
    async findAll() {
        return this.prisma.match.findMany({
            include: {
                user1: { select: { id: true, name: true, photos: true } },
                user2: { select: { id: true, name: true, photos: true } },
                chat: true,
            },
        });
    }
    async findByUser(userId) {
        return this.prisma.match.findMany({
            where: {
                OR: [{ user1Id: userId }, { user2Id: userId }],
            },
            include: {
                user1: { select: { id: true, name: true, photos: true } },
                user2: { select: { id: true, name: true, photos: true } },
                chat: true,
            },
        });
    }
    async findOne(id) {
        const match = await this.prisma.match.findUnique({
            where: { id },
            include: {
                user1: { select: { id: true, name: true, photos: true } },
                user2: { select: { id: true, name: true, photos: true } },
                chat: true,
            },
        });
        if (!match)
            throw new common_1.NotFoundException(`Match con id ${id} no encontrado`);
        return match;
    }
    async update(id, updateMatchDto) {
        await this.findOne(id);
        return this.prisma.match.update({
            where: { id },
            data: updateMatchDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        const chat = await this.prisma.chat.findUnique({ where: { matchId: id } });
        if (chat) {
            await this.prisma.message.deleteMany({ where: { chatId: chat.id } });
            await this.prisma.chat.delete({ where: { id: chat.id } });
        }
        return this.prisma.match.delete({
            where: { id },
        });
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], MatchService);
//# sourceMappingURL=match.service.js.map