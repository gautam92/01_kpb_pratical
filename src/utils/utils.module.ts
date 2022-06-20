import { Global, Module } from '@nestjs/common';
import { Helper } from './helper.service';
import { JwtHelper } from './jwt.helper';
import { PasswordHelper } from './password.helper';

const services = [Helper, JwtHelper, PasswordHelper];

@Global()
@Module({
  imports: [],
  providers: [...services],
  exports: services,
})
export class UtilsModule {}
