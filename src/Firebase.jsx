import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAv5ntwl8fMw0eubUGLE7uaCin5Gr2XkIw",
    authDomain: "chatlive-ceba2.firebaseapp.com",
    projectId: "chatlive-ceba2",
    storageBucket: "chatlive-ceba2.appspot.com",
    messagingSenderId: "811071186172",
    appId: "1:811071186172:web:ef6a88a1f3c190a74ba379"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage()
export const db = getFirestore()