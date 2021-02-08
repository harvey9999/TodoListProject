import firebase from 'firebase/app';
import store from '@/store/store';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCJqFtJh1yBKKiOVHxK7h8Q94GRfRtHmE8",
    authDomain: "todolist-87983.firebaseapp.com",
    projectId: "todolist-87983",
    storageBucket: "todolist-87983.appspot.com",
    messagingSenderId: "359534633247",
    appId: "1:359534633247:web:f9fac3bdadfc13e11b102a",
    measurementId: "G-LMLLMT54RY"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('fetchUser', user);
});