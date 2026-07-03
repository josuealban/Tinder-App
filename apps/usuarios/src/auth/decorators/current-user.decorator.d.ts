import { Role } from '../enums/role.enum.js';
export declare class AuthenticatedUser {
    userId: number;
    email: string;
    role: Role;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
