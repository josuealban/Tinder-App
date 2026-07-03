"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionModule = void 0;
const common_1 = require("@nestjs/common");
const interaction_service_1 = require("./interaction.service");
const interaction_controller_1 = require("./interaction.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let InteractionModule = class InteractionModule {
};
exports.InteractionModule = InteractionModule;
exports.InteractionModule = InteractionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [interaction_controller_1.InteractionController],
        providers: [interaction_service_1.InteractionService, prisma_service_js_1.PrismaService],
        exports: [interaction_service_1.InteractionService],
    })
], InteractionModule);
//# sourceMappingURL=interaction.module.js.map