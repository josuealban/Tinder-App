import { Module } from '@nestjs/common';
import { AuthModule } from '../../tindel/src/auth/auth.module';
import { UserModule } from '../../tindel/src/user/user.module';
import { PhotoModule } from '../../tindel/src/photo/photo.module';
import { SubscriptionModule } from '../../tindel/src/subscription/subscription.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PhotoModule,
    SubscriptionModule,
  ],
})
export class UsuariosModule { }