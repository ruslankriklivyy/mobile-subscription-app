import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { ISubscription } from '../store/subscriptions.store';

interface ISubscriptionItemProps {
  subscription: ISubscription;
}

export const SubscriptionItem: React.FC<ISubscriptionItemProps> = ({
  subscription,
}) => {
  const { name, price, rgbColor, paymentMonth } = subscription;

  return (
    <View style={styles.item}>
      <View style={styles.logoBox}>
        <View
          style={{
            ...styles.logo,
            backgroundColor: `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.6)`,
          }}
        >
          <Text
            style={{
              ...styles.symbol,
              color: `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`,
            }}
          >
            {name[0].toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>{name}</Text>
      </View>

      <View>
        <Text style={styles.price}>{price}$</Text>
      </View>

      <View>
        <Text style={styles.payment}>{paymentMonth}th</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingRight: 10,
    marginBottom: 20,
  },

  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 70,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  symbol: {
    fontWeight: '600',
    fontSize: 28,
  },

  name: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
  },

  price: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    fontSize: 22,
  },

  payment: {
    fontSize: 22,
  },
});
