import React from 'react';
import { User } from 'firebase/auth';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { observer } from 'mobx-react-lite';

import { WelcomeScreen } from './screens/welcome-screen';
import { AuthScreen } from './screens/auth-screen';
import HomeScreen from './screens/home-screen';

import { useRootStore } from './store/root-store.context';
import { auth } from './config/firebase';

const Stack = createNativeStackNavigator();

const RootProvider = observer(() => {
  const {
    userStore: { user, setUser },
  } = useRootStore();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (authenticatedUser) => {
        try {
          await (authenticatedUser
            ? setUser(authenticatedUser as User)
            : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    );

    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}
    >
      <Stack.Screen
        options={{ headerShown: true }}
        name="My Subs"
        component={() => <HomeScreen />}
      />

      {!user && (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="WelcomeScreen"
            component={() => <WelcomeScreen />}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={() => <AuthScreen mode={'register'} />}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={() => <AuthScreen mode={'login'} />}
          />
        </>
      )}
    </Stack.Navigator>
  );
});

export default RootProvider;
