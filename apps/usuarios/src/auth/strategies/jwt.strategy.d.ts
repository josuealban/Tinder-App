import { Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service.js';
import { AuthenticatedUser } from '../decorators/current-user.decorator.js';
interface JwtPayload {
    email: string;
    sub: number;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: JwtPayload): Promise<AuthenticatedUser>;
}
export { };
