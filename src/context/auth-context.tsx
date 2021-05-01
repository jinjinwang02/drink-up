import React, { useState, useEffect, useContext, createContext } from 'react';
import { destroyCookie, parseCookies } from 'nookies';
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
  const cookies = parseCookies();
  const [isLogIn, setLogIn] = useState<boolean>(true);

  const [user, setUser] = useState<firebase.User | null>(null);
  const [userRef, setUserRef] = useState<any>(null);
  const [userDoc, setUserDoc] = useState<
    firebase.firestore.DocumentData | undefined
  >();
  useEffect(() => {
    if (cookies.token) {
      return auth.onIdTokenChanged(async (user) => {
        if (!user) {
          setUser(null);
          destroyCookie(undefined, 'token');
          return;
        }
        setUser(user);
        const ref = firestore.doc(`users/${user?.uid}`);
        setUserRef(ref);
        const doc = await ref.get().then((res) => res.data());
        setUserDoc(doc);
      });
    }
  }, [auth, cookies.token, firestore]);

  return (
    <AuthContext.Provider value={{ user, userRef, userDoc, isLogIn, setLogIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext: () => AuthContextProps = () =>
  useContext(AuthContext);
