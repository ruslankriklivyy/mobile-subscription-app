import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthLayout } from '../layouts/auth-layout';
import { RootStackParamList } from '../types';

export const WelcomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <AuthLayout
      title={'Welcome to SubsApp'}
      description={'An app to manage your subscriptions to various services'}
      btnLabel={'Create an Account'}
      onPress={() =>
        navigation.navigate('Registration', { id: 'Registration' })
      }
    />
  );
};
