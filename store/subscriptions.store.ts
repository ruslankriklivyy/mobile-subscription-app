import { makeAutoObservable } from 'mobx';
import { collection, doc, getDocs } from 'firebase/firestore';

import firebase, { db } from '../config/firebase';

const auth = firebase.auth();

export interface ISubscription {
  id: string;
  name: string;
  price: number;
  rgbColor: Record<string, number>;
  paymentMonth: number;
}

export class SubscriptionsStore {
  constructor() {
    makeAutoObservable(this);
  }

  subscriptions: ISubscription[] = [];

  isFetching: boolean = false;
  isError: boolean = false;

  getAll = async () => {
    this.setLoading();

    try {
      const querySnapshot = await getDocs(collection(db, 'subscriptions'));

      this.setLoaded(() => {
        const subscriptions = querySnapshot.docs.map((elem) => elem.data());
        this.subscriptions = subscriptions as ISubscription[];
      });
    } catch (err) {
      this.setError();
    }
  };

  setLoaded = (func?: () => void) => {
    this.isError = false;
    this.isFetching = false;

    func && func();
  };

  setLoading = (func?: () => void) => {
    this.isError = false;
    this.isFetching = true;

    func && func();
  };

  setError = (func?: () => void) => {
    this.isError = true;
    this.isFetching = false;

    func && func();
  };
}
