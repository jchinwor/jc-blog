<template>
<div class="admin">
    <div class="container">
        <h2>
            Administration
        </h2>
        <div class="admin-info">
            <h2>
                Add Admin
            </h2>
            <div class="input">
                <input required type="email"  placeholder="Enter your email to make them an admin" id="addAdmins" v-model="adminEmail">
            </div>

            
                  <span class="text-danger">{{functionMsg}}</span>
         
           
            <button @click="addAdmin" type="email" class="btn btn-warning">Submit</button>
        </div>
    </div>
</div>
</template>


<script>
import { ref } from 'vue'
import firebase from "firebase/compat/app"
import "firebase/compat/functions"
export default {
    name: "Admin",
    setup(){

        const adminEmail = ref("")
        const functionMsg = ref(null)
        const error = ref(null)

        const addAdmin = async () =>{


            if(adminEmail.value == ""){
                 
                functionMsg.value = "Email is required!"
            }else{
                 const addAdmin = await firebase.functions().httpsCallable("addAdminRole");
                 const result = await addAdmin({email:adminEmail.value})

                 functionMsg.value = result.data.message
                   

            //   if(functionMsg.value === null){
                   
                   
            //          functionMsg.value = "User not found"
            
                
            //   }else{
             
            //      functionMsg.value = "Email made an Admin"
                
            //   }
            }

           
            
        }

        return{
            functionMsg, adminEmail, addAdmin, error
        }
    }
}
</script>

<style>
 .admin .container{
    max-width:1000px;
    padding:60px 25px;
 }
  .admin .container h2{
    text-align: center;
    margin-bottom:16px;
    font-weight:300;
    font-size:32px;
  }
.admin .container .admin-info{
    border-radius:8px;
    padding:32px;
    background:#f1f1f1;
    display:flex;
    flex-direction:column;
    max-width:600px;
    margin:32px auto;
}
.admin .container .admin-info span{
    font-size:14px;
}
.admin .container .admin-info .input{
    margin:16px 0;
}
.admin .container .admin-info .input label{
    font-size:14px;
    display:block;
    padding-bottom:6px
}
.admin .container .admin-info .input input{
    width: 100%;
    border:none;
    background:#f2f7f6;
    padding:8px;
    height:50px;

}
.admin .container .admin-info .input input:focus{
    outline:none;
}
.admin .container .admin-info button{
    align-self:center;
}
</style>