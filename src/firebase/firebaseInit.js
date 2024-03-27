import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

const firebaseConfig = {

    apiKey: process.env.VUE_APP_API_KEY,
  
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
   
    projectId: process.env.VUE_APP_PROJECT_ID,
  
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  
    messagingSenderId: process.env.VUE_APP_MESSAGINGSENDER_ID,
  
    appId: process.env.VUE_APP_APPID
  
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export {timestamp}
  export default firebaseApp.firestore()