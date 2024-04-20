import { initializeApp } from "firebase/app"
import { getFirestore } from  "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA-3uj2Rmnc7p8OJqJCgbxBJ8CnEUnFn1o",
  authDomain: "next-todolist-ccc37.firebaseapp.com",
  projectId: "next-todolist-ccc37",
  storageBucket: "next-todolist-ccc37.appspot.com",
  messagingSenderId: "670627881269",
  appId: "1:670627881269:web:4207ab8d1be2cfa0162c7c"
};

//変数に登録したdbやauthの情報を格納
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export  { db, auth, app };
