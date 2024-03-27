import { defineStore } from "pinia";
import { computed, ref } from "vue";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import db from "../firebase/firebaseInit"


export const usePostsStore = defineStore('posts', ()=>{

    const blogPosts= ref([])
    const error = ref(null)

    const posts = async () =>{
      
         try {
    
            const dataBase = await db.collection("blogPosts").orderBy('date','desc');
            const dbResults = await dataBase.get();
    
            dbResults.forEach((doc) =>{
                if(!blogPosts.value.some(post => post.blogID == doc.id)){
                  const data = {
                    blogID: doc.data().blogID,
                    blogHTML: doc.data().blogHTML,
                    blogCoverPhoto: doc.data().blogCoverPhoto,
                    blogTitle: doc.data().blogTitle,
                    blogDate: doc.data().date,
                    slug: doc.data().slug
                  };
    
                  blogPosts.value.push(data)
    
                }
            })

           if(!dbResults.data().fullName){
             throw Error('No data available')
           }
    
            
         } catch (err) {
           error.value = err.message
          
         }  
    
    }



    return {
        blogPosts,posts
    }

})