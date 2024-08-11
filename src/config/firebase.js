
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB46E0K0H35ACQLNCTMZDn34X_i61g-_os",
  authDomain: "fir-course-c82dc.firebaseapp.com",
  projectId: "fir-course-c82dc",
  storageBucket: "fir-course-c82dc.appspot.com",
  messagingSenderId: "288605416201",
  appId: "1:288605416201:web:73c42f45250e5f32f9c1d8",
  measurementId: "G-EQVTQ3NPY9"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {auth};
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
