import { makeAutoObservable } from 'mobx';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

import { db } from '../config/firebase';

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

  createOne = async (payload: Omit<ISubscription, 'id'>) => {
    this.setLoading();

    try {
      const subscriptionRef = doc(collection(db, 'subscriptions'));
      await setDoc(subscriptionRef, { ...payload, id: subscriptionRef.id });

      this.setLoaded(() => {
        this.getAll();
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
