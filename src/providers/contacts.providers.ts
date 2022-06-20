import { Contacts } from '../entities/contacts.entity';

/**
 * Contacts provider
 */
export const contactsProviders = [
  {
    provide: 'CONTACTS_REPOSITORY',
    useValue: Contacts,
  },
];
