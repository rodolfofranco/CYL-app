import * as firebase from 'firebase';


//Conexión con la base de datos Firebase
var config = {
    apiKey: "AIzaSyD2zaEDDNzMtFslnMF2yyZ9rUePjaXojUc",
    authDomain: "cyl-database.firebaseapp.com",
    databaseURL: "https://cyl-database.firebaseio.com",
    projectId: "cyl-database",
    storageBucket: "cyl-database.appspot.com",
    messagingSenderId: "43454093772"
  };
  var fire = firebase.initializeApp(config);
  export default fire;
