import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.service';

export function register({ email, password }: { email: string; password: string }) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login({ email, password }: { email: string; password: string }) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function getUser() {
  return auth.currentUser;
}

export function subscribeToAuthStateChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => cb(user));
}
