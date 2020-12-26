import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

// const firebaseConfigTesting = {
//   apiKey: "AIzaSyA6zgXL4ibt3FxYZOSaV-UkblC-6-3DAG8",
//   authDomain: "testing-react-app-6c68c.firebaseapp.com",
//   projectId: "testing-react-app-6c68c",
//   storageBucket: "testing-react-app-6c68c.appspot.com",
//   messagingSenderId: "1084530309010",
//   appId: "1:1084530309010:web:99dacf55862a3a998a734b",
// };

// if (process.env.NODE_ENV === "test") {
//   //Testing
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
//   //Dev/Prod
//   firebase.initializeApp(firebaseConfig);
// }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Grabar info y google auth provider
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
