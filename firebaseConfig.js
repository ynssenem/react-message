// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEYRKMSjJyoSIWbhzsmwNTtOx5f8hoFtk",
  authDomain: "react-real-time-chat-app-68b3b.firebaseapp.com",
  databaseURL: "https://react-real-time-chat-app-68b3b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-real-time-chat-app-68b3b",
  storageBucket: "react-real-time-chat-app-68b3b.appspot.com",
  messagingSenderId: "1083528433326",
  appId: "1:1083528433326:web:a95e83838dbe245dd5a73f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const auth = getAuth(app) 
export const database = getDatabase(app);
export const generateChatKey = (userUid) => {
  return auth.currentUser.uid < userUid ? `${auth.currentUser.uid}_${userUid}` : `${userUid}_${auth.currentUser.uid}`;
}

export default app;
