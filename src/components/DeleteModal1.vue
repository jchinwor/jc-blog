<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <div @click="close">
               <i  class="far fa-times-circle"></i>
          </div>
         
         


                
            <div>

                <p>Are you sure you want to delete post?</p>
              
                <div class="mb-3">
                  <label  class="form-label">Post Title</label>
                  <input type="text" class="form-control" id="" v-model="blogTitle" readonly>
                
                </div>
              
              
                <button type="" @click="deletePost" class="btn btn-primary">Delete</button>
          </div>

              

         
          <!-- Modal Content -->
          <slot />
          <!-- <button @click="close" type="button">Close</button> -->
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { onMounted, ref } from 'vue';
import firebase from "firebase/compat/app"
import { doc, deleteDoc } from "firebase/firestore";
import "firebase/compat/storage";
import db from "../firebase/firebaseInit"
import { useRouter } from 'vue-router';
export default {
  props: ["modalActive","blogid"],
  setup(props, { emit }) {


    const router = useRouter(); 


     const blogTitle = ref("")

      let bPosts = ref([])

       blogTitle.value = bPosts.postTitle

    const postblogid = props.blogid

    onMounted(()=> {
      

      
              
            db.collection("blogPosts").doc(postblogid)
              .get().then(snapshot => {
                  if (!snapshot.exists) return;
                  const data = snapshot.data() // 
                  // continue your code
                  bPosts.value.push(data)
                  // console.log(data)

                blogTitle.value = data.blogTitle;
               
                // dropzoneFile.value = data.blogCoverPhoto;

                

              });



         
        })
   
     

      const deletePost = async () =>{
              
               if(blogTitle.value !==""){

                    
                    const getPost = db.collection("blogPosts").doc(postblogid);
                    await getPost.delete();
                   
                         alert("Post successfully Deleted");

                      // emit("close"); 

                           setTimeout(() =>{
                              router.push({
          
                              name: "home"
                             

                            })
                          }, 5000);
                
                 
               }
                
                     
      }

    const close = () => {
      emit("close");
    };

    return { close, postblogid,blogTitle,bPosts, deletePost, };
  },
};
</script>

<style scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
}
.modal  .modal-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    max-width: 640px;
    width: 80%;
    box-shadow: 0 4px 6px 6px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    padding: 64px 16px;
    border: none;

  }

  .modal  .modal-inner  button {
      padding: 20px 30px;
      border: none;
      font-size: 16px;
      background-color: #ff9700;
      color: #fff;
      cursor: pointer;
    }

  

  .modal  .modal-inner  svg {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 20px;
      cursor: pointer;
    }

     .modal  .modal-inner  i:hover{
         color: #ff9700;
     }
</style>