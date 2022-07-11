import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRootStore } from '../store/root-store.context';
import { Controller, useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { MyInput } from './my-input';
import { validationMessages } from '../utils/labels';
import { Button } from './button';

export const SubscriptionForm = observer(() => {
  const {
    subscriptionsStore: { createOne },
  } = useRootStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      price: 0,
      paymentMonth: 0,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.item}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <MyInput value={value} label={'Type name'} onChange={onChange} />
          )}
          name="name"
        />

        {errors.name && (
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
              value={String(value)}
              label={'Type price'}
              onChange={onChange}
            />
          )}
          name="price"
        />

        {errors.price && (
          <Text style={styles.textError}>{validationMessages.required}</Text>
        )}
      </View>

      <View style={styles.actions}>
        <Button label={'Create'} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    padding: 15,
  },

  item: {
    marginVertical: 10,
  },

  textError: {},

  actions: {
    marginTop: 40,
  },
});
