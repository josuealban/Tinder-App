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
exports.PhotoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../dist/src/prisma/prisma.service.js");
let PhotoService = class PhotoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPhotoDto) {
        return this.prisma.photo.create({
            data: createPhotoDto,
        });
    }
    async findAll() {
        return this.prisma.photo.findMany();
    }
    async findOne(id) {
        const photo = await this.prisma.photo.findUnique({
            where: { id },
        });
        if (!photo)
            throw new common_1.NotFoundException(`Foto con id ${id} no encontrada`);
        return photo;
    }
    async findByUser(userId) {
        return this.prisma.photo.findMany({
            where: { userId },
        });
    }
    async update(id, updatePhotoDto) {
        await this.findOne(id);
        return this.prisma.photo.update({
            where: { id },
            data: updatePhotoDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.photo.delete({
            where: { id },
        });
    }
};
exports.PhotoService = PhotoService;
exports.PhotoService = PhotoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], PhotoService);
//# sourceMappingURL=photo.service.js.map