import { createContext } from 'react';

import { UserStore } from './user.store';
import { SubscriptionsStore } from './subscriptions.store';

export const rootStoreContext = createContext({
  UserStore: new UserStore(),
  SubscriptionsStore: new SubscriptionsStore(),
});
