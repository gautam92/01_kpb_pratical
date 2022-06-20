import { Module } from '@nestjs/common';
import { contactsProviders } from '../../../providers/contacts.providers';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [],
  controllers: [ContactsController],
  providers: [ContactsService, ...contactsProviders],
})
export class ContactsModule {}
