import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/admin/auth/auth.module';
import { ContactsModule } from './modules/admin/contacts/contacts.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [DatabaseModule, AuthModule, ContactsModule, UtilsModule],
  controllers: [],
})
export class AppModule {}
