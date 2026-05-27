import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class AuthenticatedUser {
  userId!: number;
  email!: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthenticatedUser }>();
    return request.user;
  },
);
