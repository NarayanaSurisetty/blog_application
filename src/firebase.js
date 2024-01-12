import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdlFNHk_GvAQgoG-ve8DTVSvlbPdNva6Q",
  authDomain: "blog-application-10734984.firebaseapp.com",
  projectId: "blog-application-10734984",
  storageBucket: "blog-application-10734984.appspot.com",
  messagingSenderId: "516506896177",
  appId: "1:516506896177:web:a24d4965aec0ab2adc5210",
  measurementId: "G-MZJC4NK4G4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;