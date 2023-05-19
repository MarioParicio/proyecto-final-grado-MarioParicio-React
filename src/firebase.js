// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBneyIUb_11xmFut1TadCjU0LDSTJDOijg",
  authDomain: "flutterproyectosegundaev.firebaseapp.com",
  databaseURL: "https://flutterproyectosegundaev-default-rtdb.firebaseio.com",
  projectId: "flutterproyectosegundaev",
  storageBucket: "flutterproyectosegundaev.appspot.com",
  messagingSenderId: "20725459804",
  appId: "1:20725459804:web:2e44264ec2641273beaf99",
  measurementId: "G-RBTGH7628P"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.database();
export const storage = app.storage();
export default app;