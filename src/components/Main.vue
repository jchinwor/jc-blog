<template>
  <div class="__main container">
     
      <div class="row mb-5">
                <div class="col-lg-6">
                  <div class="inner">
                      <div >
                        <div v-if="isLoggedIn">
                          
                          Hello <b style="color:#ff9700">{{ name }}</b>
                          <p>Welcome to <b>JBLOG</b>, a simple blog  with Vuejs, Firebase and Bootstrap</p>
                          </div>
                       
                        <div v-show="postshow"> 
                          
                          <Skeleton width="5rem" class="mb-2" borderRadius="16px"></Skeleton>
                          <Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
                          <Skeleton height="2rem" width="30rem" borderRadius="16px" class="mb-2"></Skeleton>
                           
                       </div>
                      </div>
                   
                    
                      <div v-show="postshow1">
                          <p>Welcome to <b>JBLOG</b>, a simple blog  with Vuejs, Firebase and Bootstrap</p>
                        <button class="btn btn-dark me-3"><router-link :to="{ name: 'login'}">Login</router-link></button>
                      <span class="mr-5">Don't Have an Account, <router-link :to="{ name: 'register'}">Register</router-link></span>
                      </div>
                  </div>
            </div>
           
            <div class="col-lg-6 right">
                <img :src="hero" alt="" class="rounded">
            </div>
      </div>
      

    </div>
    
    <div class="post_list">
   <div class="container">
    <div class="row">
        <div class="col-md-12">
          <h3>View Recent Blogs</h3>
            <div class="d-flex justify-content-md-end mb-3 justify-content-sm-center" v-if="isAdmin">
                  <div class="checkbox">
                    Toggle Edit Post
                  <input type="checkbox" id="click" v-model="editPost" @click="toggleCheck">
                  <label for="click" class="text"></label>
                </div>
              
            </div>
          <div class="blog-card-wrap">
          
         <div class="blog_card">
  
                <BlogCard :editPost="editPost" :post="post" v-for="post in visiblePost" :key="post.blogID"/>

          </div>
        </div>

              <nav>
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a href="javascript:" @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="page-link">
                          Previous
                        </a>
                    </li>

                      <li class="page-item" v-for="pageNumber in visiblePageNumbers" :key="pageNumber" :class="{active : currentPage == pageNumber || pageNumber === '....'}">
                          <a href="javascript:" @click="changePage(pageNumber)" class="page-link">
                            {{pageNumber}} 
                          </a>
                      </li>

                    <li class="page-item">
                        <a href="#" @click="changePage(currentPage + 1)" :disabled="currentPage === 1" class="page-link">
                          Next
                        </a>
                    </li>
                </ul>
            </nav>
    </div>
</div>
</div>
      </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { usePostsStore } from "../store/getPosts"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { useRouter } from 'vue-router';
import { onMounted,computed, ref } from 'vue'
import BlogCard from "../components/BlogCard.vue"


export default {

components:{ BlogCard},
  setup(){
    const img = require("../assets/jchinwormockup.png")
    const hero = require("../assets/hero.png")
    const name = ref("")
    const editPost = ref("");
    const isLoggedIn = ref(false);
    const postshow = ref(false);
    const postshow1 = ref(true);
    const isAdmin = ref(false);
    const checked = ref(false);
    const itemPerpage = ref(false);
    const  currentPage = ref(false);
    const router = useRouter()

    itemPerpage.value = 4;
    currentPage.value = 1;
   
    const store = usePostsStore();
    const { blogPosts,error } = storeToRefs(store)
    const { posts } = store



   

    
   
      const toggleCheck = () =>{
      
      return editPost.value
    }

       const changePage = (page) =>{
          if(page >= 1 && page <= totalPages.value){
             currentPage.value = page
          }
      }

       const visiblePost = computed(() => {

                const startPage = (currentPage.value - 1) * itemPerpage.value;

                const endPage = startPage + itemPerpage.value
                
                return blogPosts.value.slice(startPage,endPage)
             });

        const totalPages = computed(() => {

              return Math.ceil(blogPosts.value.length / itemPerpage.value) 

        })
        const visiblePageNumbers = computed(() => {

              let pageNumbers = []

              if(totalPages.value <= 7){
                for(let i =1; i <= totalPages.value;i++){
                     pageNumbers.push(i)
                }
              }else{
                  if(currentPage <= 4){
                     pageNumbers = [1,2,3,4,5,".....",totalPages.value];
                  }else if(currentPage.value >= totalPages.value - 3){  
                        pageNumbers = [1,"....",totalPages.value - 4, totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value] 
                  }else{
                    pageNumbers = [1,"....",currentPage.value - 1, currentPage.value, currentPage.value + 1, ".....", totalPages.value]
                  }
              }

              return pageNumbers
        })


      onMounted( ()=> {

        
          firebase.auth().onAuthStateChanged(async (user)=> {
                
              if(user){

                  
                 setTimeout(() =>{
            //   router.push({

            //   name: "home"
                
                  isLoggedIn.value = !isLoggedIn.value
                  postshow.value = !postshow.value
               

            // })
                  }, 5000);

                  name.value = user.email.split('@')[0]

                  postshow.value = !postshow.value
                  postshow1.value = !postshow1.value
              
                // currentUser()

                const token = await user.getIdTokenResult();
                const admin = await token.claims.admin
                  isAdmin.value = admin

                }else{

                  // isLoggedIn.value = ref(false)

                 
                }
              })
       
           posts()
           toggleCheck()
         
      })

    return{
      img, hero,checked,currentPage,visiblePost,changePage,totalPages,visiblePageNumbers,isAdmin,postshow1, postshow, isLoggedIn, editPost,error, name, toggleCheck
    }
  }
}
</script>

<style>
.navbar .router-link-active{
  color:#ff6601!important;
}

.post_list{
    flex: 1 1 0%;
    display: block;
    border-radius: 1.5rem 1.5rem 0 0;
    background:#eee;
    box-shadow: 0px -4px 12px 4px rgba(0,0,0, 0.16);
    color:#000;
    padding:4rem 1.5rem;
}
.__main{
  overflow: hidden;
  padding:12px;
  margin-top:20px;
}

.__main .inner{
  margin-top:100px;
}
@media(max-width:980px){
  .__main .inner{
  margin-top:0px;
    }
    .__main{
        text-align: center;
    }
  .__main .right img{
        display:none;
    }
}
.right img{
  width: 100%;
}

</style>