import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import ColorPicker from 'react-native-wheel-color-picker';

import { useRootStore } from '../store/root-store.context';
import { MyInput } from './my-input';
import { validationMessages } from '../utils/labels';
import { Button } from './button';
import { hexToRgb } from '../utils/toRgb';
import { rgbToHex } from '../utils/toHex';
import { ISubscription } from '../store/subscriptions.store';

interface ISubscriptionFormProps {
  id?: string | null;
  closeModal?: () => void;
}

interface IFormValues {
  name: string;
  price: number;
  paymentMonth: number;
}

const getDefaultValues = (subscription: Partial<ISubscription> | null) => {
  return {
    name: subscription?.name || '',
    price: subscription?.price || 0,
    paymentMonth: subscription?.paymentMonth || 0,
  };
};

export const SubscriptionForm: React.FC<ISubscriptionFormProps> = observer(
  ({ id, closeModal }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [rgbColor, setRgbColor] = React.useState('#4cd0d8');

    const {
      subscriptionsStore: { subscription, getOne, createOne, updateOne },
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

    const onSubmit = (values: IFormValues) => {
      const color = hexToRgb(rgbColor);

      if (color) {
        if (id) {
          updateOne(id, { ...values, rgbColor: color });
        } else {
          createOne({ ...values, rgbColor: color });
        }

        reset();
        setModalVisible(false);
        closeModal && closeModal();
      }
    };

    const defaultValues = React.useMemo(() => {
      return getDefaultValues(id ? subscription : null);
    }, [subscription, id]);

    React.useEffect(() => {
      if (id) {
        getOne(id);
      }
    }, [id]);

    React.useEffect(() => {
      if (Object.keys(subscription || {}).length) {
        setRgbColor(rgbToHex(subscription.rgbColor || {}));
      }
    }, [subscription]);

    React.useEffect(() => {
      reset(defaultValues);
    }, [reset, defaultValues]);

    return (
      <>
        <View style={styles.wrapper}>
          <View style={styles.item}>
            <Button
              customStyles={styles.btnColorPicker}
              labelStyles={{ color: '#0261FE' }}
              label={'Pick color'}
              onPress={() => setModalVisible(true)}
            />
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
                  label={'Type name'}
                  onChange={onChange}
                />
              )}
              name="name"
            />

            {errors.name && (
              <Text style={styles.textError}>
                {validationMessages.required}
              </Text>
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
                  keyboardType={'numeric'}
                />
              )}
              name="price"
            />

            {errors.price && (
              <Text style={styles.textError}>
                {validationMessages.required}
              </Text>
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
                  label={'Type payment for month'}
                  onChange={onChange}
                  keyboardType={'numeric'}
                />
              )}
              name="paymentMonth"
            />

            {errors.paymentMonth && (
              <Text style={styles.textError}>
                {validationMessages.required}
              </Text>
            )}
          </View>

          <View style={styles.actions}>
            <Button label={'Create'} onPress={handleSubmit(onSubmit)} />
          </View>
        </View>

        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.colorPicker}>
            <ColorPicker
              color={rgbColor}
              onColorChange={setRgbColor}
              palette={[]}
              thumbSize={40}
              sliderSize={40}
              noSnap={true}
              row={false}
            />
          </View>
        </Modal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    padding: 15,
  },

  btnColorPicker: {
    paddingVertical: 13,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0261FE',
    borderStyle: 'dotted',
  },

  colorPicker: {
    marginVertical: 10,
    height: '40%',
  },

  item: {
    marginVertical: 10,
  },

  textError: {
    color: 'red',
  },

  actions: {
    marginTop: 40,
  },
});
