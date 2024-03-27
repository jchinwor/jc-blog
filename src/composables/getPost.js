import {ref } from '@vue/reactivity'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import db from "../firebase/firebaseInit"


const post = (id) =>{

    const blogPost= ref(null)
    const error = ref(null)
    const newData = ref(null)

    // const currentBlog = ref(null)
  
 


    const loadPost = async () => {
     try {

        // const dataBase = await db.collection("blogPosts").doc(id);
        const dbResults = await dataBase.get();
        blogPost.value = dbResults


        const dataBase = db.collection("blogPosts").doc(id).get().then(doc => {
          const newData = doc.data();
          console.log(newData.value);
      });
        // dbResults.forEach((doc) =>{
        //     if(!blogPosts.value.some(post => post.blogID == doc.id)){
        //       const data = {
        //         blogID: doc.data().blogID,
        //         blogHTML: doc.data().blogHTML,
        //         blogCoverPhoto: doc.data().blogCoverPhoto,
        //         blogTitle: doc.data().blogTitle,
        //         blogDate: doc.data().date
        //       };

        //       blogPosts.value.push(data)

              
              

             
        //     }
        // })

       



      

       if(!dbResults.data().fullName){
         throw Error('No data available')
       }

        
     } catch (err) {
       error.value = err.message
      
     }

    }

    return{blogPost,loadPost,newData}

}

export default post