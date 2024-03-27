<template>
    
<div class="b text-center">
  <Loading v-show="loading"/>
  <main class="form-signin w-100 m-auto">
        <form @submit.prevent="signinHandler">
          <!-- <img class="mb-4" src="../assets/dark.png" alt="" width="100" > -->
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                <div v-show="error" class="error">
                    {{ errorMsg }}
                </div>
          <div class="form-floating">
            <input type="email" v-model="email" class="form-control" id="floatingInput" required>
            <label for="floatingInput">Email</label>
          </div>
          <div class="form-floating">
            <input type="password" v-model="password" class="form-control" id="floatingPassword" required>
            <label for="floatingPassword">Password</label>
          </div>
          <p> <span class="mr-5"><router-link :to="{ name: 'forgotpassword'}">Forgot Password?</router-link></span></p>
        
          <p> <span class="mr-5">Don't Have an Account, <router-link :to="{ name: 'register'}">Register</router-link></span></p>
          <button class="w-100 btn btn-lg btn-dark" type="submit">Sign in</button>
        
        </form>
</main>

</div>
</template>

<script>
import Loading from "../components/Loading.vue"
import firebase from "firebase/compat/app"
import { useRouter } from 'vue-router';
import "firebase/compat/auth"
import { ref } from 'vue'

export default {
    components:{ Loading },
    setup(){
          const error = ref(null)
          const errorMsg = ref("")
          const email = ref("")
          const password = ref("")
          const loading = ref(null)
          const router = useRouter()


          const signinHandler = () =>{

            loading.value = true
              
              firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(()=>{
                    router.push({
                          name: "home"
                      })

                      error.value = false
                      errorMsg.value = ""
                      loading.value = false


              }).catch(err => {
                    error.value = true
                    errorMsg.value = err.message
                   
                                    if (err.code == "auth/email-already-in-use") {
                                            errorMsg.value = "The email address is already in use";
                                            loading.value = false
                                            
                                        } else if (err.code == "auth/invalid-email") {
                                            errorMsg.value = "The email address is not valid.";
                                            loading.value = false
                                        } else if (err.code == "auth/operation-not-allowed") {
                                            errorMsg.value = "Operation not allowed.";
                                        loading.value = false
                                        } else if (err.code == "auth/weak-password") {
                                            errorMsg.value = "The password is too weak.";
                                            loading.value = false
                                        } else if(err.code == "auth/user-not-found") {
                                             errorMsg.value = "Invalid Login credentials";
                                            loading.value = false
                                        
                                        }
                                         else if(err.code == "auth/wrong-password") {
                                             errorMsg.value = "Invalid Login credentials";
                                            loading.value = false
                                        } 
                                        else if(err.code == "auth/internal-error") {
                                             errorMsg.value = "Invalid Login credentials";
                                            loading.value = false
                                        } 
                                        else if(err.code == "auth/network-request-failed") {
                                             errorMsg.value = "Something went wrong, please try again";
                                             loading.value = false
                                        } 
              })
          }


          return {
            email, password, error, errorMsg, signinHandler, loading
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