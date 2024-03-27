<template>

    <div class="card-list" v-if="postshow">
          <Loading v-show="loading"/>
    <div v-show="editPost" class="icons">
      
       
        <div class="icon">
            <router-link class="linke" :to='{ name: "edit", params: {blogid: post.blogID}}'>
                <i class="fa fa-edit"></i>
                

            </router-link>
             
        </div> 
         <div @click="deletePost" class="icon" >
            <i class="fa fa-trash"></i>
        </div>
    </div>
        <a href="#" class="card-item">
            <img :src="post.blogCoverPhoto" alt="Card Image">
            <span class="post">Posted on: {{ new Date(post.blogDate).toLocaleString("en-us", { dateStyle: "long"}) }}</span>
            <h3>{{ post.blogTitle }}</h3>
            <div class="arrow">
                <router-link class="link readmore" :to='{ name: "blog", params: {blogid: post.blogID}}' ><i class="fas fa-arrow-right card-icon"></i></router-link>
            </div>
        </a>
       
    </div>




<div  v-else class="card-list">
    <Skeleton width="20rem" class="mb-2" height="9rem" borderRadius="16px"></Skeleton>
    <Skeleton class="mb-2" width="20rem" borderRadius="16px"></Skeleton>
    <Skeleton width="5rem" borderRadius="16px" class="mb-5"></Skeleton>
    <Skeleton height="2rem" width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
</div>


    <DeleteModal @close="toggleDeleteModal" :modalActive="modalDeleteActive" v-show="deleteModal" :blogid = "post.blogID" />

 
</template>

<script>
import { ref, watch } from 'vue'

import Loading from "../components/Loading.vue"
import DeleteModal from "../components/DeleteModal1.vue"

export default {
    components: {Loading,DeleteModal},
    props: ["post","editPost"],
    setup(props){

        const loading = ref(false)
        const postshow = ref(false)
        const deleteModal = ref(false) 
        const modalDeleteActive = ref(false);
        

        const post = props.post

        let Postsent = ref([])
        Postsent.value.push(post)


          if(Postsent.value.length){
                setTimeout(() =>{
            //   router.push({

            //   name: "home"
                
                postshow.value = !postshow.value

            // })
            }, 5000);
            }

      
       const deletePost = () =>{

           deleteModal.value = !deleteModal.value
             modalDeleteActive.value = !modalDeleteActive.value;
        
          

        }

                      
           

    const toggleDeleteModal = () => {

      modalDeleteActive.value = !modalDeleteActive.value;
     
    };

        return{ deletePost, loading, deleteModal, modalDeleteActive, toggleDeleteModal, post, postshow}
    }
}
</script>

<style scoped>

.card-list .svg-inline--fa{
  color:#ff6601!important;
}
.card-list {
     position:relative;
    cursor:pointer;
   display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      align-items: stretch; /*stretches all cards same height*/
}
.card-list .card-item {
    background: #fff;
    padding: 26px;
    border-radius: 8px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.04);
    list-style: none;
    cursor: pointer;
    text-decoration: none;
    /* border: 2px solid transparent; */
    transition: border 0.5s ease;
}
.card-list .card-item:hover {
    border: 2px solid #000;
}
.card-list .icons{
    display:flex;
    position:absolute;
    top:10px;
    right:10px;
    z-index:99;
}
.card-list .icons .icon{
    display:flex;
    justify-content: center;
    align-items: center;
    height:35px;
    width:35px;
    background:#fff;
    border-radius:50%;
    transition: 0.5s ease all;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.5);
}
.card-list .icons .icon:nth-child{
    margin-right:8px 
}
.card-list .card-item img {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 8px;
    object-fit: cover;
}
.card-list span {
    display: inline-block;
    background: #F7DFF5;
    margin-top: 32px;
    padding: 8px 15px;
    font-size: 0.75rem;
    border-radius: 50px;
    font-weight: 600;
}
.card-list .post {
    background-color: #ffc979; 
    color: #6e4303;
}   
.card-list .designer {
    background-color: #d1e8ff;
    color: #2968a8;
}
.card-list .editor {
    background-color: #d6f8d6; 
    color: #205c20;
}
.card-item h3 {
    color: #000;
    font-size: 1.438rem;
    margin-top: 28px;
    font-weight: 600;
}
.card-item .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(-35deg);
    height: 40px;
    width: 40px;
    color: #000;
    border: 1px solid #000;
    border-radius: 50%;
    margin-top: 40px;
    transition: 0.2s ease;
}
.card-list .card-item:hover .arrow  {
    background: #000;
    color: #fff; 
}
@media (max-width: 1200px) {
    .card-list .card-item {
        padding: 15px;
    }
}
@media screen and (max-width: 980px) {
    .card-list {
        margin: 0 auto;
    }
}
</style>