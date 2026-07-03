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
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const match_service_js_1 = require("./match.service.js");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/guards/roles.guard.js");
const roles_decorator_js_1 = require("../auth/decorators/roles.decorator.js");
const role_enum_js_1 = require("../auth/enums/role.enum.js");
const create_match_dto_js_1 = require("./dto/create-match.dto.js");
const update_match_dto_js_1 = require("./dto/update-match.dto.js");
let MatchController = class MatchController {
    matchService;
    constructor(matchService) {
        this.matchService = matchService;
    }
    create(createMatchDto) {
        return this.matchService.create(createMatchDto);
    }
    findAll() {
        return this.matchService.findAll();
    }
    findOne(id) {
        return this.matchService.findOne(id);
    }
    findByUser(userId) {
        return this.matchService.findByUser(userId);
    }
    update(id, updateMatchDto) {
        return this.matchService.update(id, updateMatchDto);
    }
    updatePut(id, updateMatchDto) {
        return this.matchService.update(id, updateMatchDto);
    }
    remove(id) {
        return this.matchService.remove(id);
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_match_dto_js_1.CreateMatchDto]),
    __metadata("design:returntype", void 0)
], MatchController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MatchController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MatchController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MatchController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_match_dto_js_1.UpdateMatchDto]),
    __metadata("design:returntype", void 0)
], MatchController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_match_dto_js_1.UpdateMatchDto]),
    __metadata("design:returntype", void 0)
], MatchController.prototype, "updatePut", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MatchController.prototype, "remove", null);
exports.MatchController = MatchController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, common_1.Controller)('matches'),
    __metadata("design:paramtypes", [match_service_js_1.MatchService])
], MatchController);
//# sourceMappingURL=match.controller.js.map