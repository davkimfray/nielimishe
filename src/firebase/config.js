
import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDMUvPCCtE3JIhUtUz5XP12B7iheskEEko",
    authDomain: "nielimishe-85840.firebaseapp.com",
    databaseURL: "https://nielimishe-85840.firebaseio.com",
    projectId: "nielimishe-85840",
    storageBucket: "nielimishe-85840.appspot.com",
    messagingSenderId: "448615526629",
    // measurementId: "G-P7F6Q6DLZ4",
    appId: "1:448615526629:web:d7a34d1ad8907e7132640c"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
