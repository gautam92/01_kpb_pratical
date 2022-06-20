import { Module } from '@nestjs/common';
import { usersProviders } from '../../../providers/users.providers';
import { userSessionsProviders } from '../../../providers/user-sessions.providers';
import { LoginController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [AuthService, ...usersProviders, ...userSessionsProviders],
})
export class AuthModule {}
