<template>
 <div class="post-view">
    <div class="container quillWrapper" v-for="post in bPosts" :key="post.blogID">
        <h2>
            {{post.blogTitle}}
        </h2>
        <img :src="post.blogCoverPhoto" class="rounded" :alt="post.blogTitle">
        <h6>
            <b>Posted on: {{new Date(post.date).toLocaleString("en-us", { dateStyle: "long"}) }} </b>
        </h6>
        <div class="post-content ql-editor" v-html="post.blogHTML"></div>
    </div>
 </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import db from "../firebase/firebaseInit"
export default {
 
    props: ['blogid'],
    setup(props){
        const route = useRoute();  
        
        // const id = props.blogid
        const id = route.params.blogid
        let bPosts = ref([])
    
     onMounted( ()=> {
       db.collection('blogPosts').doc(id)
        .get().then(snapshot => {
            if (!snapshot.exists) return;
             const data = snapshot.data() // 
            // continue your code
             bPosts.value.push(data)
        });
         
        })


        return{
            bPosts
        }
    }

}
</script>

<style>
.post-view{
    min-height:100%;
}
.post-view .container{
    padding:30px 10px;
}
.post-view .container img{
    width:100%;
    height:400px;
}

@media(max-width:900px){

    .post-view .container img{
        width:100%;
    }
}
.post-view h2{
    margin-bottom:16px;
    font-weight:300;
    font-size:32px;
}

/* .post-view img{
    width:100%;
    margin-bottom:32px;
} */

.post-view .ql-editor{
    padding:0;
    
}
</style>