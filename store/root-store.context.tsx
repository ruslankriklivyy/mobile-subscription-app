import React from 'react';
import { UserStore } from './user.store';
import { SubscriptionsStore } from './subscriptions.store';

type RootStateContextValue = {
  userStore: UserStore;
  subscriptionsStore: SubscriptionsStore;
};

export const RootStateContext = React.createContext<RootStateContextValue>(
  {} as RootStateContextValue
);

const userStore = new UserStore();
const subscriptionsStore = new SubscriptionsStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}> | any> = ({
  children,
  value,
}) => (
  <RootStateContext.Provider value={value ?? { userStore, subscriptionsStore }}>
    {children}
  </RootStateContext.Provider>
);

export const useRootStore = () => React.useContext(RootStateContext);
