import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { RootStateProvider } from './store/root-store.context';
import RootProvider from './root-provider';

export default function App() {
  return (
    <RootStateProvider>
      <NavigationContainer>
        <RootProvider />
      </NavigationContainer>
    </RootStateProvider>
  );
}

export const globalStyles = StyleSheet.create({
  mainBox: {
    backgroundColor: '#fff',
  },
});
