import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthLayout } from '../layouts/auth-layout';
import { MyInput } from '../components/my-input';
import { validationMessages } from '../utils/labels';
import { useRootStore } from '../store/root-store.context';
import { RootStackParamList } from '../types';

interface IAuthScreenProps {
  mode?: 'login' | 'register';
}

interface IFormValues {
  email: string;
  password: string;
}

export const AuthScreen: React.FC<IAuthScreenProps> = observer(({ mode }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    userStore: { login, register, isError },
  } = useRootStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: IFormValues) => {
    if (mode === 'register') {
      register(values);
    }

    if (mode === 'login') {
      login(values);
    }

    if (isError) {
      // TODO: handle error
      return;
    }

    navigation.navigate('My Subs', { id: 'My Subs' });
    reset();
  };

  return (
    <AuthLayout
      title={mode === 'register' ? 'Create an Account' : 'Welcome Back!'}
      description={mode === 'login' && 'We are happy to see. You can login.'}
      mode={mode}
      btnLabel={'Next'}
      onPress={handleSubmit(onSubmit)}
    >
      <>
        <View style={styles.item}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <MyInput
                value={value}
                label={'Type your email'}
                onChange={onChange}
              />
            )}
            name="email"
          />

          {errors.email && (
            <Text style={styles.textError}>{validationMessages.required}</Text>
          )}
        </View>

        <View style={styles.item}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <MyInput
                value={value}
                label={'Set your password'}
                onChange={onChange}
                isPassword
              />
            )}
            name="password"
          />

          {errors.password && (
            <Text style={styles.textError}>{validationMessages.required}</Text>
          )}
        </View>
      </>
    </AuthLayout>
  );
});

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },

  textError: {
    marginLeft: 5,
    color: 'red',
  },
});
