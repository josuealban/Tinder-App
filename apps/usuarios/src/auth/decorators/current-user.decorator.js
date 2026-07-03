"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = exports.AuthenticatedUser = void 0;
const common_1 = require("@nestjs/common");
class AuthenticatedUser {
    userId;
    email;
    role;
}
exports.AuthenticatedUser = AuthenticatedUser;
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=current-user.decorator.js.map