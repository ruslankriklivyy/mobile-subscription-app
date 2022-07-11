import Constants from 'expo-constants';
import firebase from 'firebase/compat';
import { getFirestore } from '@firebase/firestore';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  databaseURL: Constants.manifest?.extra?.firebaseDatabaseUrl,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
};

const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = firebase.auth();
export default firebase;
