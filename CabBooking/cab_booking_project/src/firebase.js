import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCcdVnAjkio5WIqPYeTQexER0QgdIhnh1M",
    authDomain: "webapi-88a91.firebaseapp.com",
    databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com",
    projectId: "webapi-88a91",
    storageBucket: "webapi-88a91.appspot.com",
    messagingSenderId: "102122774240",
    appId: "1:102122774240:web:aedee404a652e9d8cdfa85",
    measurementId: "G-88KQJJH4MV"
  };

firebase.initializeApp(firebaseConfig);
  
export default firebase