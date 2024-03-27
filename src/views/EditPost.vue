<template>
      <div v-show="loading">
             <Loading />
        </div>    
  <div class="create container p-5 text-center">
       
          <div class="card" style="width: 48rem;border:none;align-text:center" >

             <div v-show="error" class="error">
                  {{ errorMsg }}
              </div>

            <h3>Edit Post</h3>
              <DropZone @drop.prevent="drop" @change="selectedFile"/>
                <span class="file-info">File: {{ dropzoneFile.name }}</span>
                <button ref="element" @click="togglePrevew"  class="btn btn-dark"  :class="{ 'button-inactive' : !url}">Preview Image</button>
            <!-- <img :src="img" class="card-img-top" alt="..."> -->
            <p>
              <input class="form-control form-control-lg mt-4" v-model="blogTitle" type="text" placeholder="Enter Blog Title" required>

            
            </p>
              
            <div class="card-body editor">
            
                <QuillEditor theme="snow" toolbar="full" :modules="modules"   v-model:content="blogHTML" contentType="html" />

                
          
            </div>
              <div class="blog-actions">
                <button class="btn btn-dark" @click="updatePost">Save Changes</button>
              </div>
          </div>
   
      
  </div>
  <ShowImageModal  @close="toggleModal" :modalActive="modalActive" >

      <img :src="url" alt="" style="width:300px;">

  </ShowImageModal>

 
</template>
<script>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import firebase from "firebase/compat/app"
import "firebase/compat/storage";
import db from "../firebase/firebaseInit"
import Modal from "../components/Modal.vue"
import Loading from "../components/Loading.vue"
import DropZone from '../components/DropZone.vue'
import ShowImageModal from '../components/ShowImageModal.vue'
import { QuillEditor } from '@vueup/vue-quill'
import BlotFormatter from 'quill-blot-formatter'
import getCurrentUser from "../composables/getCurrentUser"
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components:{ DropZone, ShowImageModal, QuillEditor, Modal, Loading},
    setup(){
    const img = require("../assets/jchinwormockup.png")
    const modalMessage = ref(null);
    const loading = ref(false)
    let   dropzoneFile = ref("");
    let   url = ref("");
    const blogTitle = ref("")
    const blogHTML = ref("");
    const modalActive = ref(false);
    const element = ref(null);
    const error = ref(null)
    const errorMsg = ref("")
    const slug = ref("");

    const route = useRoute();  
    const router = useRouter();  
    const id = route.params.blogid

          let bPosts = ref([])

          blogTitle.value = bPosts.postTitle

          

          onMounted(()=> {
      
              
            db.collection('blogPosts').doc(id)
              .get().then(snapshot => {
                  if (!snapshot.exists) return;
                  const data = snapshot.data() // 
                  // continue your code
                  bPosts.value.push(data)
                  // console.log(data)


                  blogTitle.value = data.blogTitle;
                  blogHTML.value = data.blogHTML;
                // dropzoneFile.value = data.blogCoverPhoto;

                

              });



         
        })

 const {profileID, load} = getCurrentUser()


    const drop = (e) => {
      dropzoneFile.value = e.dataTransfer.files[0];
      url.value = URL.createObjectURL(dropzoneFile.value)
    };

     const modules = {
      name: 'blotFormatter',  
      module: BlotFormatter, 
      options: {/* options */}
       }

    load()

    const togglePrevew = () =>{
          if (element.value.classList.contains('button-inactive')) {
      // Do something
          }else{
             modalActive.value = !modalActive.value;
          }
    }
    
    const toggleModal = () => {

      modalActive.value = !modalActive.value;
     
    };

   const closeModal = () =>{

            modalActive.value = !modalActive.value

            // email.value = ref("")

                    window.location.reload()
             }


    const  updatePost  = () =>{

      slug.value = Slug(blogTitle.value)

          if(blogTitle.value !=="" && blogHTML.value !== ""){

            loading.value = ref(true)
            
            if(dropzoneFile.value){

              loading.value = ref(true)

              const storageRef = firebase.storage().ref();
              const docRef = storageRef.child(`documents/BlogCoverPhotos/${dropzoneFile.value.name}`)
              docRef.put(dropzoneFile.value).on("state_changed", (snapshot) => {

                    

              }, (err)=>{
                console.log(err)
              }, async () =>{
                  const downloadURL = await docRef.getDownloadURL();
                  const timestamp = await Date.now();
                  const dataBase = await db.collection("blogPosts").doc(id);

                  await dataBase.update({
                      blogID: dataBase.id,
                      blogHTML: blogHTML.value,
                      blogCoverPhoto: downloadURL,
                      blogTitle: blogTitle.value,
                      profileId: profileID.value,
                      date: timestamp,
                      slug: slug.value,
                  })

                      loading.value = !loading.value
                      alert("Post successfully Updated")
                     

                   router.push({

                       name: "blog",
                       params: {slug: slug.value, blogid: dataBase.id}

                    })


              }
              )
              return
            }
           

           
             const dataBase =  db.collection("blogPosts").doc(id);
               
                 db.collection("blogPosts").doc(id).update({
                      blogHTML: blogHTML.value,
                      blogTitle: blogTitle.value,
                      slug: slug.value,
                    
                  });

                  loading.value = false;
                  alert("Post successfully Updated");
                     

                  
                 
                  setTimeout(() =>{
                       router.push({
   
                       name: "blog",
                       params: {slug: slug.value, blogid: dataBase.id}

                    })
                  }, 3000);

              

             
           
            
            

            

          }else{
            
            loading.value = false
            error.value = true
            errorMsg.value = "Please ensure the BlogTitle and BlogContent Field are filled!"
            setTimeout(() =>{
                error.value = false
            }, 5000);

            return
          }

         
    }

    const selectedFile = () => {
      dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
      url.value = URL.createObjectURL(dropzoneFile.value)

    };


    return{
      img,bPosts,closeModal,slug, profileID, error, errorMsg, updatePost, loading, modalMessage, modalActive, blogTitle, drop, selectedFile, togglePrevew, dropzoneFile, modalActive, toggleModal, url, modules, blogHTML, element
    }
  }
}
</script>
<style scoped>
  .create{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .file-info {
    margin-top: 32px;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
   border:none!important;
  
  }
.button-inactive{
   opacity:0.2;
  cursor:not-allowed;
}
.modal-content  h1,
p {
  margin-bottom: 16px;
}

.modal-content   h1 {
  font-size: 32px;
}

.modal-content  p {
  font-size: 18px;
}
  
.card .editor{
  height:30vh;
  display:flex;
  flex-direction: column;
}
.card .editor .quillWrapper{
  position:relative;
  display: flex;
  flex-direction: column;
  /* height:100%; */
}
.card .editor .ql-container{
  display:flex;
  flex-direction:column;
  height:100%;
  overflow:scroll;
}
.card .editor .ql-editor{
  padding:20px 16px 30px;
}
.card .blog-actions{
  margin-top:60px;
}
.card .blog-actions button{
  margin-right:16px;
}
</style>
