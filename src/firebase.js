import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAqESf7gSXCU85FkkxAa6zbQqMUsTU0D1I",
  authDomain: "maps-b13e3.firebaseapp.com",
  projectId: "maps-b13e3",
  storageBucket: "maps-b13e3.appspot.com",
  messagingSenderId: "1055851464894",
  appId: "1:1055851464894:web:8bc9ac862eac156ef676ef",
  measurementId: "G-N8E9NWY9C8"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export default firebase;
export { auth, db };
