import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDoQkPmwJQEaunh4VT68poEGWSkjtqil2Y',
  authDomain: 'moviedb-eb748.firebaseapp.com',
  databaseURL: 'https://moviedb-eb748-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'moviedb-eb748',
  storageBucket: 'moviedb-eb748.firebasestorage.app',
  messagingSenderId: '607882822199',
  appId: '1:607882822199:web:24be8968c71d20e1deb5b2',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
