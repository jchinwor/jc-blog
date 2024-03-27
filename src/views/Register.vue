<template>
    
<div class="b text-center">
        <div v-show="loading">
             <Loading />
        </div>
<main class="form-signin w-100 m-auto">
  <form @submit.prevent="register" >
    <!-- <img class="mb-4" src="../assets/dark.png" alt="" width="100" > -->
    <h1 class="h3 mb-3 fw-normal">Register your account</h1>

        <div v-show="error" class="error">
            {{ errorMsg }}
        </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" v-model="fullname" placeholder="name@example.com">
      <label for="floatingInput">Full Name</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingPassword" v-model="username" placeholder="name@example.com">
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" v-model="email" placeholder="name@example.com">
      <label for="floatingInput">Email</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" v-model="password" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>

    
    <p> <span class="mr-5">Have an Account, <router-link :to="{ name: 'login'}">Login</router-link></span></p>
    <button class="w-100 btn btn-lg btn-dark" type="submit">Register</button>

  </form>
</main>

</div>
</template>

<script>
import Loading from "../components/Loading.vue"
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import db from "../firebase/firebaseInit"

export default {

components: {Loading},
         setup(){
           const loading = ref(false)
           const fullname = ref("")
           const username = ref("")
           const email = ref("")
           const password = ref("")
           const error = ref(null)
           const errorMsg = ref("")
           const router = useRouter()

           const  register = async () => {

              loading.value = ref(true)

                    if( fullname.value !== "" && username.value !== "" &&  email.value !== "" && password.value !==""){
                        
                        error.value = false
                        errorMsg.value = ""
                        loading.value = true
                        try{
                            

                                    const firebaseAuth = await firebase.auth();
                                    const createUser = await firebaseAuth.createUserWithEmailAndPassword(email.value, password.value);
                                    const result = await createUser;
                                    const dataBase = db.collection("users").doc(result.user.uid);
                                    await dataBase.set({
                                        fullName: fullname.value,
                                        userName: username.value,
                                        email: email.value,
                                    });

                                    router.push({
                                        name: "home"
                                    })
                                  loading.value = false
                                    return;
                             

                        }
                        catch(err){
                            error.value = true;
                            // errorMsg.value = err.code;
                  
                            
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
                                        }
                             
                        
                        }
                        
                       

                         
                    }else{

                         setTimeout(() => {
                             error.value = true;
                            errorMsg.value = "Please fill out all fields!";
                            loading.value = false
                        }, 2000)


                        
                          loading.value = true
                    }
               
                    


                   

             }

            return{
                    fullname, username, email, password, register, error, errorMsg, loading
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