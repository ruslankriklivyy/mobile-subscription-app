import { makeAutoObservable } from 'mobx';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  where,
  query,
} from 'firebase/firestore';

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
  subscription: Partial<ISubscription> = {};

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

  getOne = async (id: string) => {
    this.setLoading();

    try {
      const q = query(collection(db, 'subscriptions'), where('id', '==', id));
      const docs = await getDocs(q);

      this.subscription = docs.docs.map((doc) => doc.data())[0];
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

  updateOne = async (id: string, payload: Omit<ISubscription, 'id'>) => {
    this.setLoading();

    try {
      await updateDoc(doc(db, 'subscriptions', id), payload);

      this.setLoaded(() => {
        this.getAll();
      });
    } catch (err) {
      this.setError();
    }
  };

  deleteOne = async (id: string) => {
    console.log(id);
    this.setLoading();

    try {
      await deleteDoc(doc(db, 'subscriptions', id));

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
