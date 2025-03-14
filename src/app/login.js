import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // นำเข้า auth จาก firebase.js

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

