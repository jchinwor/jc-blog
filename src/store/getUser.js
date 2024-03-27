import { defineStore } from "pinia";
import { computed, ref } from "vue";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import db from "../firebase/firebaseInit"



export const useUserStore = defineStore('user', ()=>{

    const error = ref(null)
    const fullName = ref("")
    const userName = ref("")
    const email = ref("")
    const profileID = ref(null)
    const loading = ref(false)
    const modalActive = ref(null);
    const profileinitial = ref("")
    const modalMessage = ref("Changes  saved");

    // const countDoubled = computed(()=>{

    //     return count.value * 2;

    // })

    const currentUser = async ()=>{

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

    const profileUpdate = async () =>{
                
      loading.value = true


      try{

          const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
          await dataBase.update({
              email: email.value,
              fullName: fullName.value
          })

          profileinitial.value = fullName.value.match(/(\b\S)?/g).join("")

          loading.value = false
          modalActive.value = true

         
      } catch(err){

          console.log(err.message)

      }




   }

    

    return {

        currentUser,profileUpdate,modalMessage,loading,modalActive,error,userName,fullName,email,profileID,profileinitial
    }
})