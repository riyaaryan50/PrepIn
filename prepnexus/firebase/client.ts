import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  updatePassword,
  deleteUser,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyALY9JF-Kp8eUJ9fpvt3g5WuIYHcmr5tHY",
  authDomain: "prepin-56e1f.firebaseapp.com",
  projectId: "prepin-56e1f",
  storageBucket: "prepin-56e1f.firebasestorage.app",
  messagingSenderId: "421642568057",
  appId: "1:421642568057:web:a1c917b6e5d93749ae6fa8",
  measurementId: "G-SX0XYKBVNH"
};


// ✅ Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Change password (with re-authentication)
export async function changePassword(currentPassword: string, newPassword: string) {
  const user = auth.currentUser;

  if (!user || !user.email) {
    return { success: false, message: "No user is logged in." };
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error: any) {
    console.error("Password update error:", error);
    return { success: false, message: error.message };
  }
}

// ✅ Delete account (with re-authentication)
export async function deleteAccount(currentPassword: string) {
  const user = auth.currentUser;

  if (!user || !user.email) {
    return { success: false, message: "No user is logged in." };
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await deleteUser(user);
    return { success: true };
  } catch (error: any) {
    console.error("Account deletion failed:", error);
    return { success: false, message: error.message };
  }
}

// ✅ Logout
export async function logout() {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
