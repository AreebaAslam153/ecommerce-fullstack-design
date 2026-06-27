import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth, database } from "../firebase/firebase";
import { ref, set, get } from "firebase/database";

// ===============================
// Register User
// ===============================
export const registerUser = async (userData) => {
  const { name, phone, address, email, password } = userData;

  // Create Authentication Account
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const uid = userCredential.user.uid;

  // Save User Profile
  await set(ref(database, `users/${uid}`), {
    uid,
    name,
    phone,
    address,
    email,

    // Every new user is Customer
    role: "customer",

    createdAt: new Date().toISOString(),
  });

  return userCredential.user;
};

// ===============================
// Login
// ===============================
export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// ===============================
// Logout
// ===============================
export const logoutUser = async () => {
  return await signOut(auth);
};

// ===============================
// Get Logged In User Profile
// ===============================
export const getCurrentUserData = async () => {
  const user = auth.currentUser;

  if (!user) return null;

  const snapshot = await get(ref(database, `users/${user.uid}`));

  if (snapshot.exists()) {
    return snapshot.val();
  }

  return null;
};

export default auth;