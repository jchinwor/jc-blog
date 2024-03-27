<template>
    
<div class="b text-center">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
     <Loading v-if="loading"/>
<main class="form-signin w-100 m-auto">
        <form @submit.prevent="resetPassword">
            <!-- <img class="mb-4" src="../assets/dark.png" alt="" width="100" > -->
            <h1 class="h3 mb-3 fw-normal">Forgotten your password?</h1>
            <p>Enter your email address below to begin the reset process.</p>

            <div class="form-floating">
            <input type="email" class="form-control" v-model="email" id="floatingInput" required placeholder="name@example.com">
            <label for="floatingInput">Email</label>
            </div>

            <p> <span class="mr-5">Don't Have an Account, <router-link :to="{ name: 'register'}">Register</router-link></span></p>
            <button class="w-100 btn btn-lg btn-dark" type="submit">Submit</button>
            <p class="mt-5 mb-3 text-body-secondary">&copy; 2023</p>
        </form>
</main>

</div>
</template>

<script>
import { ref } from 'vue'
import Modal from "../components/Modal.vue"
import Loading from "../components/Loading.vue"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
export default {
components: {Loading, Modal},
setup(){
    const modalActive = ref(null);
    const modalMessage = ref("");
    const email = ref("");
    const loading = ref(null)

       const closeModal = () =>{

            modalActive.value = !modalActive.value
            // email.value = ref("")
        }
       const resetPassword = () =>{

            loading.value = true;

            firebase
            .auth()
            .sendPasswordResetEmail(email.value)
            .then(() =>{
                modalMessage.value = "If your account exists, you will receive a email"
                 loading.value = false
                 modalActive.value = true
            }).catch( err =>{
                 modalMessage.value = err.message;
                
                                   if (err.code == "auth/user-not-found") {
                                            modalMessage.value = "No user record with that email address.";
                                            loading.value = false
                                        } 

                 loading.value = false
                 modalActive.value = true
            });


        }




        return{
            email, closeModal, modalActive, modalMessage, loading, resetPassword
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

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
 input:focus {
    outline: none;
    border: 1px solid #ff6601;
  }
</style>