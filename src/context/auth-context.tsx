import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseClient } from '../firebase/firebase-client';

interface AuthContextProviderProps {
  children: React.ReactNode;
}

type UserRef = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
export type UserDoc = firebase.firestore.DocumentData;

interface AuthContextProps {
  user: firebase.User | null;
  userRef: UserRef | null;
  userDoc?: UserDoc;
  isLogIn: boolean;
  setLogIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  userRef: null,
  userDoc: undefined,
  isLogIn: true,
  setLogIn: () => null,
});

export const AuthProvider: React.FC<AuthContextProviderProps> = ({
  children,
}: AuthContextProviderProps) => {
  const { auth, firestore } = firebaseClient();
  const [isLogIn, setLogIn] = useState<boolean>(true);

  const [user, setUser] = useState<firebase.User | null>(null);
  const [userRef, setUserRef] = useState<any>(null);
  const [userDoc, setUserDoc] = useState<
    firebase.firestore.DocumentData | undefined
  >();
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.destroy(undefined, 'token');
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      const ref = firestore.doc(`users/${user?.uid}`);
      setUserRef(ref);
      const doc = await ref.get().then((res) => res.data());
      setUserDoc(doc);
      nookies.set(undefined, 'token', token, { maxAge: 2 * 60 * 60 });
    });
  }, [auth, firestore]);

  return (
    <AuthContext.Provider value={{ user, userRef, userDoc, isLogIn, setLogIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext: () => AuthContextProps = () =>
  useContext(AuthContext);
