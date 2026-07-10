import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, addDoc, collection, where, query, getDocs, Firestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, Auth, UserCredential } from 'firebase/auth';
import type { FirebaseConfig, UserData } from '../../types';

const config: FirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJET_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;

  constructor() {
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }

  signupUser = async (payload: { email: string; password: string; pseudo: string }): Promise<void> => {
    const { email, password, pseudo } = payload;

    try {
      const data: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      sessionStorage.setItem('uid', data.user.uid);
      await this.createUser({
        uid: data.user.uid,
        pseudo,
        email: data.user.email,
      });
    } catch (error) {
      console.log('Error while signing up the user...', error);
    }
  };

  loginUser = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(this.auth, email, password);
      sessionStorage.setItem('uid', userCredential.user.uid);
    } catch (error) {
      console.log('Error while login the user...', error);
    }
  };

  signOutUser = async (): Promise<void> => {
    await this.auth.signOut();
  };

  passwordReset = async (email: string): Promise<void> => {
    await sendPasswordResetEmail(this.auth, email);
  };

  createUser = async (payload: UserData): Promise<void> => {
    try {
      await addDoc(collection(this.db, 'users'), payload);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  async fetchUserData(): Promise<UserData | undefined> {
    try {
      const uid = sessionStorage.getItem('uid');
      if (!uid) {
        return undefined;
      }

      const q = query(collection(this.db, 'users'), where('uid', '==', uid));
      const querySnapshotOne = await getDocs(q);

      const allData: UserData[] = [];
      querySnapshotOne.forEach((doc) => allData.push(doc.data() as UserData));
      return allData[0];
    } catch (error) {
      console.log('error while fetching users..', error);
      return undefined;
    }
  }
}

export default Firebase;
