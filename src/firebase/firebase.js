

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCu3PCyMGubG3WfonJB2I8T9lKKNA_3QEw",
  authDomain: "shopease-ae538.firebaseapp.com",
  databaseURL: "https://shopease-ae538-default-rtdb.firebaseio.com",
  projectId: "shopease-ae538",
  storageBucket: "shopease-ae538.firebasestorage.app",
  messagingSenderId: "435429141864",
  appId: "1:435429141864:web:f1a771040933ec5b10badd",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);