import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyAfH448mv-9onnwanzxvCWo8dPt974-g8k",
  authDomain: "react-realtime-chatting-app.firebaseapp.com",
  databaseURL: "https://react-realtime-chatting-app.firebaseio.com",
  projectId: "react-realtime-chatting-app",
  storageBucket: "react-realtime-chatting-app.appspot.com",
  messagingSenderId: "1076388803614",
  appId: "1:1076388803614:web:74118d36202c118744ea0f",
  measurementId: "G-L5FMYGXKQR"
};
firebase.initializeApp(config);

export default firebase;
