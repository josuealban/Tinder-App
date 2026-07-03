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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoController = void 0;
const common_1 = require("@nestjs/common");
const photo_service_js_1 = require("./photo.service.js");
const create_photo_dto_js_1 = require("./dto/create-photo.dto.js");
const update_photo_dto_js_1 = require("./dto/update-photo.dto.js");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/guards/roles.guard.js");
const roles_decorator_js_1 = require("../auth/decorators/roles.decorator.js");
const role_enum_js_1 = require("../auth/enums/role.enum.js");
let PhotoController = class PhotoController {
    photoService;
    constructor(photoService) {
        this.photoService = photoService;
    }
    create(createPhotoDto) {
        return this.photoService.create(createPhotoDto);
    }
    findAll() {
        return this.photoService.findAll();
    }
    findOne(id) {
        return this.photoService.findOne(id);
    }
    findByUser(userId) {
        return this.photoService.findByUser(userId);
    }
    update(id, updatePhotoDto) {
        return this.photoService.update(id, updatePhotoDto);
    }
    updatePut(id, updatePhotoDto) {
        return this.photoService.update(id, updatePhotoDto);
    }
    remove(id) {
        return this.photoService.remove(id);
    }
};
exports.PhotoController = PhotoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_photo_dto_js_1.CreatePhotoDto]),
    __metadata("design:returntype", void 0)
], PhotoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhotoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhotoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhotoController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_photo_dto_js_1.UpdatePhotoDto]),
    __metadata("design:returntype", void 0)
], PhotoController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_photo_dto_js_1.UpdatePhotoDto]),
    __metadata("design:returntype", void 0)
], PhotoController.prototype, "updatePut", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhotoController.prototype, "remove", null);
exports.PhotoController = PhotoController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, common_1.Controller)('photos'),
    __metadata("design:paramtypes", [photo_service_js_1.PhotoService])
], PhotoController);
//# sourceMappingURL=photo.controller.js.map