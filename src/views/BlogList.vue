<template>
<div class="grey">
     <div class=" p-5 ">
    <div class="row">
        <div class="col-md-12">

              <div class="d-flex justify-content-md-end mb-4 mb-md-0 justify-content-sm-center" v-if="isAdmin">
                  <div class="checkbox">
                    Toggle Edit Post
                  <input type="checkbox" id="checkbox"  v-model="editPost" >
                  <label for="click" class="text"></label>
                </div>
              
            </div>
         <div class="blog-card-wrap">
          
         <div class="blog_card">

               <BlogCard :editPost="editPost" :post="post" v-for="post in visiblePost" :key="post.blogID"/>
             
          </div>

            

        </div>

           <nav class="mt-4 mt-md-0">
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
import BlogCard from "../components/BlogCard.vue"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { onMounted,computed, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { usePostsStore } from "../store/getPosts"


export default {
    components:{BlogCard},
    setup(){
     const img = require("../assets/jchinwormockup.png")
     const editPost = ref(null);
     const isAdmin = ref(false);
     const isLoggedIn = ref(false);
     const itemPerpage = ref(false);
     const  currentPage = ref(false);

     const store = usePostsStore();
     const { blogPosts,error } = storeToRefs(store)
     const { posts } = store
    
       itemPerpage.value = 4;
       currentPage.value = 1;

        
         
      

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

          isLoggedIn.value = true
          

           const token = await user.getIdTokenResult();
           const admin = await token.claims.admin
          
                isAdmin.value = admin

                
           

          }else{
            
          }
        })
       
       
        
        posts()
        

    })

    return{
      blogPosts,img,currentPage,visiblePost,changePage,totalPages,editPost,visiblePageNumbers,isAdmin,isLoggedIn
    }
  }
}
</script>

<style>
.grey{
    background:#eee;
}
.active > .page-link, .page-link.active {
  z-index: 3;
  color: #fff!important;
  background-color: #000!important;
  border-color: #000!important;;
}

.page-link{
  color:#000!important;
}
</style>