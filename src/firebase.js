import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyprE1Mbjl-r7V1lSQTRND61136TCBXJo",
    authDomain: "vihaan-electrix.firebaseapp.com",
    projectId: "vihaan-electrix",
    storageBucket: "vihaan-electrix.appspot.com",
    messagingSenderId: "1058312483716",
    appId: "1:1058312483716:web:c73331f62084c5361a23d1",
    measurementId: "${config.measurementId}"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;