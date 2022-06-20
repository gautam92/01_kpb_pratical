import { UserSessions } from '../entities/users.sessions.entity';

export const userSessionsProviders = [
  {
    provide: 'USER_SESSIONS_REPOSITORY',
    useValue: UserSessions,
  },
];
