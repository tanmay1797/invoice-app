import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAY-DVyr8oUcJzS8bD5WD2O9p27bYqPqSY",
  authDomain: "invoice-app-e14b7.firebaseapp.com",
  projectId: "invoice-app-e14b7",
  storageBucket: "invoice-app-e14b7.appspot.com",
  messagingSenderId: "778486149393",
  appId: "1:778486149393:web:db7a7775021d802b8bdcb0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
