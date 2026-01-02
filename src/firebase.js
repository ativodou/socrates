import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAdK3Sk7G6WAFnV-yuN_PNwkUyi9Rbx7hY",
  authDomain: "socrates-86d13.firebaseapp.com",
  projectId: "socrates-86d13",
  storageBucket: "socrates-86d13.firebasestorage.app",
  messagingSenderId: "411404101720",
  appId: "1:411404101720:web:14700b2225728fbbe7c22d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
