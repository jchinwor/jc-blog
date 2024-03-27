<template>
 <nav class="navbar navbar-expand-lg bg-body-tertiary " >
  <div class="container-fluid container">
     <router-link class="navbar-brand" :to="{name: 'home'}">JBLOG</router-link>
    <!-- <a class="navbar-brand" href="/">JBLOG</a> -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <router-link class="nav-link active" :to="{name: 'home'}">Home</router-link>
          
        </li>
        <li class="nav-item">
            <router-link class="nav-link active" :to="{name: 'bloglist'}">Blogs</router-link>
          
        </li>
        <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link active" :to="{name: 'createpost'}">Create Post</router-link>
          
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link active" :to="{name: 'login'}">Login/Register</router-link>
          
        </li>
        <!-- <li class="nav-item" v-if="isLoggedIn">
           <router-link class="option" to="" @click="handleLogout">
               
                    <p>Log Out</p>
                  </router-link>
          
        </li> -->
    
        <li  @click="toggleProfileMenu" class="nav-item active profile" v-if="isLoggedIn" ref="profile">
            <span>{{ profileinitial }}</span>
            <div v-show="profileMenu" class="profile-menu">
                <div class="info">
                  <p class="initials">
                      {{ profileinitial }}
                  </p>
                  <div class="right">
                      <p>
                          {{ fullName }}
                      </p>
                      <p>
                          {{ userName }}
                      </p>
                      <p>
                          {{ email }}
                      </p>
                  </div>
                </div>
            
            <div class="options" >
               <div class="option">
                  <router-link class="option" :to="{ name: 'Profile' }">
                    <i class="fa fa-user icon"></i>
                    <p>Profile</p>
                  </router-link>
               </div>
             
               <div class="option" v-if="isAdmin">
                  <router-link class="option" :to="{ name: 'Admin' }">
                    <i class="fa fa-user icon"></i>
                    <p>Admin</p>
                  </router-link>
               </div>
               <div class="option" @click="handleLogout">
                 
                    <i class="fa fa-sign-out icon" aria-hidden="true"></i>
                    <p>Log Out</p>
                 
                
               </div>
            </div>
            </div>
        </li>
 
       
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useUserStore } from "../store/getUser"
import { onMounted, ref } from 'vue'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { useRouter } from 'vue-router'; 

export default {

    setup(){
       
        const profileMenu = ref(null)
        const router = useRouter()
        const profile = ref(null)
        const isLoggedIn = ref(false);
        const isAdmin = ref(false);
       

        const store = useUserStore();
        const { fullName, email, userName, profileinitial, error } = storeToRefs(store)
        const { currentUser } = store
        // const { fullName, profileinitial,userName, email, error, load } = getCurrentUser()
            
              
        
      const handleLogout = () =>{

        firebase.auth().signOut();

        window.location.reload()
    }


        const toggleProfileMenu = (e) =>{
            if(e.target === profile.value.children[0]){
                profileMenu.value = !profileMenu.value
            }
      }


      onMounted( ()=> {

        firebase.auth().onAuthStateChanged(async (user)=> {

          
          
        if(user){
          isLoggedIn.value = !isLoggedIn.value
          // load()
          currentUser()

           const token = await user.getIdTokenResult();
           const admin = await token.claims.admin
             isAdmin.value = admin
          
           

          }else{
            // isLoggedIn.value = ref(false)
          }

             
              

            
        })
       
      
             
         
      })

 

      return {
        handleLogout,toggleProfileMenu,isAdmin, profileMenu, profile, isLoggedIn, fullName, profileinitial,userName, email, error
      }

    }
}
</script>

<style>

.lout{
  cursor:pointer;
}
 .profile{
  position: relative;
  cursor:pointer;
  display:flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color:#fff;
  background:#303030;
  z-index: 999;
}


.profile .profile-menu{
  position:absolute;
  top:60px;
  right:0;
  width:250px;
  background:#303030;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}

@media (max-width: 900px){
  .profile .profile-menu{
       left:40px;
  }
}

.profile .profile-menu .info{
  display:flex;
  align-items:center;
  padding:15px;
  border-bottom: 1px solid #fff;
}

.profile .profile-menu .info .initials{
  position:initial;
  width: 40px;
  height:40px;
  background:#fff;
  color:#303030;
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius:50%;
}
.profile .profile-menu .info .right{
    flex:1;
    margin-left:24px;
}
.profile .profile-menu .info .right p:nth-child(1){
    font-size:14px;
    margin-bottom:3px;
}
.profile .profile-menu .info .right p:nth-child(2),p:nth-child(3){
  font-size:12px;
  margin-bottom:3px;
}

.profile .profile-menu .options{
  padding:15px;
}
.profile .profile-menu .options .option{
  text-decoration: none;
  color:#fff;
  display:flex;
  align-items: center;
  margin-bottom: 12px;
}
.profile .profile-menu .options .option .icon{
    width: 13px;
    height:auto;
}
.profile .profile-menu .options .option p{
  font-size: 14px;
  margin-left: 12px;
  margin-bottom:-1px;
}
.profile .profile-menu .options .option:last-child{
    margin-bottom:0px;
}
</style>