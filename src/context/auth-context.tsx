import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseClient } from '../firebase/firebase-client';

interface AuthContextProviderProps {
  children: React.ReactNode;
}

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
  const { auth } = firebaseClient();
  const [isLogIn, setLogIn] = useState<boolean>(true);

  const [user, setUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', {});
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, 'token', token, { maxAge: 2 * 60 * 60 });
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, isLogIn, setLogIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext: () => AuthContextProps = () =>
  useContext(AuthContext);
