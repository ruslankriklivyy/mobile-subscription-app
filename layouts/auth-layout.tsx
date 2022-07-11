import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button } from '../components/button';
import { RootStackParamList } from '../types';

import FacebookIcon from '../assets/facebook.svg';
import GoogleIcon from '../assets/google.svg';

interface IAuthLayoutProps {
  title?: string;
  description?: string | boolean;
  btnLabel?: string;
  mode?: 'login' | 'register';
  onPress?: any;
  children?: React.ReactElement | undefined;
}

const height = Dimensions.get('window').height;

export const AuthLayout: React.FC<IAuthLayoutProps> = ({
  children,
  title,
  description,
  btnLabel,
  mode,
  onPress,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.block}>
          <View style={styles.blockContent}>
            <View style={styles.top}>
              {title && <Text style={styles.title}>{title}</Text>}
              {description && (
                <Text style={styles.description}>{description}</Text>
              )}
            </View>

            {children}
          </View>

          <View style={styles.bottom}>
            <Button label={btnLabel} onPress={onPress} />

            <View style={styles.orBox}>
              <View style={styles.orLine}></View>
              <Text style={styles.orText}>or Sign Up with</Text>
              <View style={styles.orLine}></View>
            </View>

            <View style={styles.socialsBox}>
              <Button
                customStyles={{ marginRight: 25 }}
                icon={<FacebookIcon width={30} height={30} />}
              />

              <Button icon={<GoogleIcon width={30} height={30} />} />
            </View>

            <View style={styles.alreadyHave}>
              <Text style={styles.alreadyHaveText}>
                {mode === 'login'
                  ? 'I already have an account'
                  : 'I need create an account'}
              </Text>

              <Pressable
                onPress={() =>
                  navigation.navigate(
                    mode === 'login' ? 'Registration' : 'Login',
                    {
                      id: mode === 'login' ? 'Registration' : 'Login',
                    }
                  )
                }
              >
                <Text style={styles.link}>
                  {mode === 'login' ? 'Create' : 'Login'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    padding: 20,
    height,
    backgroundColor: '#fff',
    flex: 1,
  },

  blockContent: {
    flex: 1,
  },

  top: {
    marginVertical: 40,
  },

  title: {
    fontWeight: '700',
    fontSize: 40,
    lineHeight: 53,
    marginBottom: 10,
  },

  description: {
    fontSize: 18,
    lineHeight: 35,
    opacity: 0.6,
  },

  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  orBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 25,
  },

  orLine: {
    width: '31%',
    height: 2,
    backgroundColor: '#e1e2e7',
  },

  socialsBox: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  alreadyHave: {
    flexDirection: 'row',
    marginTop: 15,
  },

  alreadyHaveText: {
    fontSize: 16,
    color: '#acb0b2',
  },

  link: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 4,
    color: '#1e65d9',
  },

  orText: {
    fontSize: 16,
    color: '#acb0b2',
    marginHorizontal: 10,
  },
});
