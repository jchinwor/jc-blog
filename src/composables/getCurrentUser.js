import {ref } from '@vue/reactivity'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import db from "../firebase/firebaseInit"


const currentUser = () =>{

    
    const error = ref(null)
    const fullName = ref("")
    const userName = ref("")
    const email = ref("")
    const profileID = ref(null)
    const profileinitial = ref("")
 


    const load = async () => {
     try {

        const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
        const dbResults = await dataBase.get();

        profileID.value = firebase.auth().currentUser.uid
        fullName.value = dbResults.data().fullName
        userName.value = dbResults.data().userName
        email.value = dbResults.data().email
        profileinitial.value = fullName.value.match(/(\b\S)?/g).join("")

     

      

       if(!dbResults.data().fullName){
         throw Error('No data available')
       }

        
     } catch (err) {
       error.value = err.message
      
     }

    }

    return{ fullName, profileID, error,profileinitial, userName, email, load}

}

export default currentUser