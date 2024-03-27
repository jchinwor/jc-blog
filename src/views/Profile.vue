<template>
    
<div class="b text-center">
     <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
        <div v-show="loading">
             <Loading />
        </div>
<main class="form-signin w-100 m-auto">
  <form @submit.prevent="profileUpdate" >
    <!-- <img class="mb-4" src="../assets/dark.png" alt="" width="100" > -->
    <h1 class="h3 mb-3 fw-normal">Edit Account</h1>

        <div v-show="error" class="error">
            {{ errorMsg }}
        </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" v-model="fullName" required>
      <label for="floatingInput">Full Name</label>
    </div>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingPassword" v-model="userName" readonly required>
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="floatingInput" v-model="email" required>
      <label for="floatingInput">Email</label>
    </div>
    
    <button class="w-100 btn btn-lg btn-dark" >Save Changes</button>

  </form>
</main>

</div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useUserStore } from "../store/getUser"
import Loading from "../components/Loading.vue"
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import Modal from "../components/Modal"


export default {

components: { Loading, Modal },



         setup(){
          
          
           const errorMsg = ref("")
           const router = useRouter()
          
           


          
             const store = useUserStore();
             const { fullName, email, userName,modalActive,loading,modalMessage,error } = storeToRefs(store)
             const { currentUser,profileUpdate } = store

            //  const { fullName, email, userName, load } = getCurrentUser()


            const closeModal = () =>{

            modalActive.value = !modalActive.value

            // email.value = ref("")

                    // window.location.reload()
             }

          

     onMounted( ()=> {


            
        firebase.auth().onAuthStateChanged((user)=> {
            
            if(user){

            
            //   isLoggedIn.value = true
              currentUser()

            }else{
                // isLoggedIn.value = false
            }
            })
        
            
            
        })

      return {
            fullName,store,error, loading, email, userName,currentUser, modalActive,modalMessage,profileUpdate, closeModal
      }
   

            
        }
}
</script>

<style scoped>
 .b{
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
 
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

/* .form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
} */

.form-floating{
    margin-top:12px;
}
 input:focus {
    outline: none;
    border: 1px solid #ff6601;
  }
</style>