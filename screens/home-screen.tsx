import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRootStore } from '../store/root-store.context';
import { observer } from 'mobx-react-lite';
import { SubscriptionItem } from '../components/subscription-item';

const HomeScreen = observer(() => {
  const {
    subscriptionsStore: { getAll, subscriptions },
  } = useRootStore();

  React.useEffect(() => {
    getAll();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.list}>
        <FlatList
          data={subscriptions}
          renderItem={({ item }) => <SubscriptionItem subscription={item} />}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    paddingHorizontal: 15,
  },

  list: {},
});

export default HomeScreen;
