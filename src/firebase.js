import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA__j-AXQd1ZRb7XuU6qHQSLaT2CBx6T_E",
  authDomain: "help-chat-reactjs.firebaseapp.com",
  projectId: "help-chat-reactjs",
  databaseURL: "https://help-chat-reactjs.firebaseio.com",
  storageBucket: "help-chat-reactjs.appspot.com",
  messagingSenderId: "756318419573",
  appId: "1:756318419573:web:e484d3aed6e45e7d44d63c",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const SignUp = async (email, password) => {
  try {
    createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const errorMessage = error.message;
    alert(errorMessage);
  }
};

const SignIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, storage, SignIn, SignUp, logout };
