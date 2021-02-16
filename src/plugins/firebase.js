import firebase from 'firebase/app';
import store from '@/store/store';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCbk6amNm4gKU9iD2dtF2mq0QOyjZTd-Og',
  authDomain: 'todo-app-d1242.firebaseapp.com',
  databaseURL: 'https://todo-app-d1242-default-rtdb.firebaseio.com',
  projectId: 'todo-app-d1242',
  storageBucket: 'todo-app-d1242.appspot.com',
  messagingSenderId: '1003661661098',
  appId: '1:1003661661098:web:7b33b6d010a81353c5d1d3',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('auth/userRegister', user);
  store.dispatch('auth/userLogin', user);
});

firebase.getCurrentUser = () => new Promise((resolve, reject) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    unsubscribe();
    resolve(user);
  }, reject);
});
export default firebase;
