import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../store/root-store.context';
import { SubscriptionItem } from '../components/subscription-item';
import { SubscriptionForm } from '../components/subscription-form';
import { Button } from '../components/button';

const HomeScreen = observer(() => {
  const [subscriptionId, setSubscriptionId] = React.useState<string | null>(
    null
  );
  const [modalVisible, setModalVisible] = React.useState(false);

  const {
    subscriptionsStore: { getAll, deleteOne, subscriptions },
  } = useRootStore();

  const closeModal = () => {
    setSubscriptionId(null);
    setModalVisible(false);
  };

  React.useEffect(() => {
    if (!modalVisible) {
      setSubscriptionId(null);
    }
  }, [modalVisible]);

  React.useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <Button
            label={'Add subscription'}
            customStyles={styles.addBtn}
            onPress={() => setModalVisible(true)}
          />
        </View>

        <View style={styles.list}>
          <SwipeListView
            data={subscriptions}
            renderItem={({ item }) => <SubscriptionItem subscription={item} />}
            renderHiddenItem={(data) => (
              <View style={styles.rowBack}>
                <TouchableHighlight
                  style={styles.editLeftBtn}
                  onPress={() => {
                    setSubscriptionId(data.item.id);
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.textWhite}>Edit</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={() => deleteOne(data.item.id)}
                >
                  <Text style={styles.textWhite}>Delete</Text>
                </TouchableHighlight>
              </View>
            )}
            leftOpenValue={65}
            rightOpenValue={-80}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SubscriptionForm id={subscriptionId} closeModal={closeModal} />
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    paddingHorizontal: 15,
  },

  top: {
    marginBottom: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontWeight: '600',
    fontSize: 25,
    width: '50%',
  },

  addBtn: {
    width: 200,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#2aaf24',
  },

  list: {},

  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginBottom: 20,
  },

  textWhite: {
    color: '#FFF',
  },

  editLeftBtn: {
    alignItems: 'flex-start',
    paddingLeft: 20,
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: '55%',
    backgroundColor: '#0261FE',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },

  backRightBtn: {
    alignItems: 'flex-end',
    paddingRight: 20,
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: '55%',
    marginRight: 1,
  },

  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default HomeScreen;
