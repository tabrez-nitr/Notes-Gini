import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider , signOut  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDanqMwYWIYZzfcxXQjZP9d-xViyYy3l74",
  authDomain: "notesgini.firebaseapp.com",
  projectId: "notesgini",
  storageBucket: "notesgini.firebasestorage.app",
  messagingSenderId: "519339408907",
  appId: "1:519339408907:web:2ab0077dc7550595ebd10e",
  measurementId: "G-JBCEYN8JFL"
};


export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth , provider };

