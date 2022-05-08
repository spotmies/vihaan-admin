import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyDyprE1Mbjl-r7V1lSQTRND61136TCBXJo",
//     authDomain: "vihaan-electrix.firebaseapp.com",
//     projectId: "vihaan-electrix",
//     storageBucket: "vihaan-electrix.appspot.com",
//     messagingSenderId: "1058312483716",
//     appId: "1:1058312483716:web:c73331f62084c5361a23d1",
//     measurementId: "${config.measurementId}"
//   };
const firebaseConfig = {
  apiKey: "AIzaSyD2oTrz2cxLn9w3TEhj1GKkzz0WSShVjCo",
  authDomain: "a-square-6720c.firebaseapp.com",
  projectId: "a-square-6720c",
  storageBucket: "a-square-6720c.appspot.com",
  messagingSenderId: "1042048485512",
  appId: "1:1042048485512:web:4d3ccf38205887aaaef73d",
  measurementId: "G-DNQBKSB5FG",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
