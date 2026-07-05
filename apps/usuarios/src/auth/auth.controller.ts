import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { USER_PATTERNS } from '@app/common/patterns';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern(USER_PATTERNS.REGISTER)
  register(@Payload() data: any) {
    return this.authService.register(data);
  }

  @MessagePattern(USER_PATTERNS.LOGIN)
  async login(@Payload() data: any) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
