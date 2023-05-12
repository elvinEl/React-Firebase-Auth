import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc,onSnapshot,doc,query,where } from "firebase/firestore";
import toast from "react-hot-toast";
import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";
import { openModal } from "./store/modal";
import { setTodos } from "./store/todos";

const firebaseConfig = {
  apiKey: "AIzaSyCFP6G8TLsRKQIbP1bQcbC2M15LJU-ozLo",
  authDomain: "fir-vite-421e5.firebaseapp.com",
  projectId: "fir-vite-421e5",
  storageBucket: "ir-vite-421e5.appspot.com",
  messagingSenderId: "680363971504",
  appId: "1:680363971504:web:d6ed9c437a8154e201fc75",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

// REGISTER
export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

// SIGNIN
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const reAuth = async (password) => {
  try {
    const credential = await EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    const { user } = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

// SIGNOUT
export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

// UPDATE
export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profil yenilendi");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

// UPDATA PASSWORD
export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Şifrəniz yenilendi");
    return true;
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      store.dispatch(
        openModal({
          name: "re-auth-modal",
        })
      );
    }
    toast.error(error.message);
  }
};

// VERIFICATION
export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(
      `Dogrulama maili ${auth.currentUser.email} adresine gonderildi`
    );
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        uid: user.uid,
      })
    );
    onSnapshot(query(collection(db, "todos"),where("uid","==",auth.currentUser.uid) ), (doc) => {

      store.dispatch(
        setTodos(
          doc.docs.reduce((todos,todo)=>[...todos,todo.data()],[])
        )
      )
    });
  } else {
    store.dispatch(logoutHandle(logout));
  }
});

export const addTodo = async (data) => {
  const result = await addDoc(collection(db, "todos"), data);
  console.log(result);
};




export default app;
