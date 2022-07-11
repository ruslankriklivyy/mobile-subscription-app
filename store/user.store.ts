import { makeAutoObservable } from 'mobx';
import { User } from 'firebase/auth';
import firebase from '../config/firebase';

const auth = firebase.auth();

interface ILoginPayload {
  email: string;
  password: string;
}

export class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  user: User | null = null;

  isFetching: boolean = false;
  isError: boolean = false;

  login = async (payload: ILoginPayload) => {
    this.setLoading();

    try {
      const { email, password } = payload;
      const res = await auth.signInWithEmailAndPassword(email, password);

      this.setLoaded(() => {
        this.user = res.user as User;
      });
    } catch (err) {
      this.setError();
    }
  };

  register = async (payload: ILoginPayload) => {
    this.setLoading();

    try {
      const { email, password } = payload;
      const res = await auth.createUserWithEmailAndPassword(email, password);

      this.setLoaded(() => {
        this.user = res.user as User;
      });
    } catch (err) {
      this.setError();
    }
  };

  setUser = (user: User | null) => {
    this.user = user;
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
