import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAll_3Ti1yd4iPeXda1ld2Ul-pmNp6wMis",
  authDomain: "react-app-cursos-990fb.firebaseapp.com",
  projectId: "react-app-cursos-990fb",
  storageBucket: "react-app-cursos-990fb.appspot.com",
  messagingSenderId: "984841455326",
  appId: "1:984841455326:web:ad130c29d047cb6d46e44f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Grabar info y google auth provider
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
