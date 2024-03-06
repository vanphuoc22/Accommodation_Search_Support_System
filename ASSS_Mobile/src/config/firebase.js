import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyD3zrCKWeXRGiTU0oP-DAEOSqhH77GgYu0",
//   authDomain: "asss-new.firebaseapp.com",
//   projectId: "asss-new",
//   storageBucket: "asss-new.appspot.com",
//   messagingSenderId: "556741862191",
//   appId: "1:556741862191:web:9b10abfcc67ae983ce37da",
//   measurementId: "G-CDE24X292C",
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyC80OGzy_j5pSer79VkP8YaPgsmtX94FJo",
//   authDomain: "asssnative.firebaseapp.com",
//   projectId: "asssnative",
//   storageBucket: "asssnative.appspot.com",
//   messagingSenderId: "786677430946",
//   appId: "1:786677430946:web:890b5535942000a0d575fb",
//   measurementId: "G-W7HXV1Z71D",
// };
const firebaseConfig = {
  apiKey: "AIzaSyACtY07XEROWCoUpgJIcLIIjfUZgbfjBdY",
  authDomain: "chat-4be3a.firebaseapp.com",
  projectId: "chat-4be3a",
  storageBucket: "chat-4be3a.appspot.com",
  messagingSenderId: "874551580778",
  appId: "1:874551580778:web:2d8d836c08a2dc80bd1213",
  measurementId: "G-QHBQ0YS6Q3",
};
// initialize firebase
initializeApp(firebaseConfig);
export const database = getFirestore();
export const auth = getAuth();
