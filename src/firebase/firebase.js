import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCycpvYeWyHCAdWMmfy0lYX3_8NgADwF90",
  authDomain: "random-forest-e7140.firebaseapp.com",
  projectId: "random-forest-e7140",
  storageBucket: "random-forest-e7140.appspot.com",
  messagingSenderId: "351872448192",
  appId: "1:351872448192:web:10e8355653e8ef84601f25",
  measurementId: "G-95ZMZ17HLS",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Dapatkan instance autentikasi Firebase
const auth = getAuth(app);

// Dapatkan instance Firestore Firebase
const db = getFirestore(app);

export { app, auth, db };
