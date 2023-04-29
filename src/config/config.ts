import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDHBFfihqByr0Wg363Q7tNP-INEFZYj5Vw',
  authDomain: 'cv-builder-ea985.firebaseapp.com',
  projectId: 'cv-builder-ea985',
  storageBucket: 'cv-builder-ea985.appspot.com',
  messagingSenderId: '78940056465',
  appId: '1:78940056465:web:aa3184470a5971f2e80830',
  measurementId: 'G-CYFB67JC79',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export const Detail = collection(db, 'Detail');
