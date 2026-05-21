import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';

const AuthContext = createContext(null);
const API = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const updateUserProfile = (name, photoURL) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL });

  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  const logout = async () => {
    await axios.delete(`${API}/api/jwt`, { withCredentials: true });
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          await axios.post(
            `${API}/api/jwt`,
            { email: currentUser.email },
            { withCredentials: true }
          );
        } catch (e) { /* silent */ }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, registerUser, updateUserProfile, loginWithEmail, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
