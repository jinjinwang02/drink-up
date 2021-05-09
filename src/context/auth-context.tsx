import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies, { destroyCookie, parseCookies } from 'nookies';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseClient } from '../firebase/firebase-client';

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export type UserDoc = firebase.firestore.DocumentData;

interface AuthContextProps {
  user: firebase.User | null;
  isLogIn: boolean;
  setLogIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
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
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        destroyCookie(undefined, 'token');
        return;
      }
      const token = await user.getIdToken();
      nookies.set(undefined, 'token', token, { maxAge: 24 * 60 * 60 });
      setUser(user);
    });
  }, [auth, cookies.token, firestore]);

  return (
    <AuthContext.Provider value={{ user, isLogIn, setLogIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext: () => AuthContextProps = () =>
  useContext(AuthContext);
