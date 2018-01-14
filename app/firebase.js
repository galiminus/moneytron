import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
  apiKey: 'AIzaSyDicH5DXZ-Yege9KBPkr6gXrKL5pVcSEM4',
  authDomain: "moneytron.firebaseapp.com",
  databaseURL: 'https://moneytron.firebaseio.com/',
  projectId: "firebase-moneytron"
});

export default firebase;
