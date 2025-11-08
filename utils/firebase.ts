import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCZttHmB6PuCHB5GLDfbNFBnSYYcJh_BcA",
    authDomain: "greencoin-ba186.firebaseapp.com",
    projectId: "greencoin-ba186",
    storageBucket: "greencoin-ba186.firebasestorage.app",
    messagingSenderId: "404386474477",
    appId: "1:404386474477:web:73e77bbbd2201e3ed69fe4",
    measurementId: "G-C23R98B14N"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore with better settings for React Native
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true, // Better for React Native
});

export default app;