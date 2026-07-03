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
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const subscription_service_js_1 = require("./subscription.service.js");
const subscription_tier_enum_js_1 = require("../domain/enums/subscription-tier.enum.js");
const create_subscription_dto_js_1 = require("./dto/create-subscription.dto.js");
const update_subscription_dto_js_1 = require("./dto/update-subscription.dto.js");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/guards/roles.guard.js");
const roles_decorator_js_1 = require("../auth/decorators/roles.decorator.js");
const role_enum_js_1 = require("../auth/enums/role.enum.js");
let SubscriptionController = class SubscriptionController {
    subscriptionService;
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    create(createSubscriptionDto) {
        return this.subscriptionService.create(createSubscriptionDto);
    }
    async findAll() {
        return this.subscriptionService.findAll();
    }
    async findOne(tier) {
        return this.subscriptionService.findOne(tier);
    }
    update(tier, updateSubscriptionDto) {
        return this.subscriptionService.update(tier, updateSubscriptionDto);
    }
    updatePut(tier, updateSubscriptionDto) {
        return this.subscriptionService.update(tier, updateSubscriptionDto);
    }
    remove(tier) {
        return this.subscriptionService.remove(tier);
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscription_dto_js_1.CreateSubscriptionDto]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':tier'),
    __param(0, (0, common_1.Param)('tier')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':tier'),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('tier')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_subscription_dto_js_1.UpdateSubscriptionDto]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':tier'),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('tier')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_subscription_dto_js_1.UpdateSubscriptionDto]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "updatePut", null);
__decorate([
    (0, common_1.Delete)(':tier'),
    (0, roles_decorator_js_1.Roles)(role_enum_js_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('tier')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "remove", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, common_1.Controller)('subscriptions'),
    __metadata("design:paramtypes", [subscription_service_js_1.SubscriptionService])
], SubscriptionController);
//# sourceMappingURL=subscription.controller.js.map