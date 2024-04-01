<template>
 <Header />
<div >
 <router-view v-slot="{ Component }">
  <transition name="fade" >
    <component :is="Component" />
  </transition>
</router-view>
</div>
<Footer />
</template> 

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default{
  components:{Header, Footer},

  setup(){

  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
/* .navbar a.router-link-exact-active {
  color: #fff!important;
  background:#ff9700;
  border-radius: 12px;
} */
.inner a{
  text-decoration: none!important;
  color:#ff9700!important;
}

.error{
  font-size: 12px;
  color:crimson;
}
@media(max-width:980px){
    /* .navbar a.router-link-exact-active {
      color: #ff9700!important;
      border-radius: 2px;
      background:none;

      
    } */
    .navbar-nav{
        padding:12px!important;
        margin-top:12px;
        background:#ddd;
    }
}
 .form-control:focus{
	outline: red !important;
	border-color:#559aea;
	box-shadow: none !important;
}

.checkbox{
  height: 50px;
  width: 270px;
  padding: 20px;
  display: flex;
  background: #fff;
  align-items: center;
  border-radius: 5px;
  box-shadow: 5px 5px 30px rgba(0,0,0,.2);
  justify-content: space-between;
}
.checkbox input{
  outline: none;
  height: 40px;
  width: 90px;
  border-radius: 50px;
  -webkit-appearance: none;
  position: relative;
  background: #e6e6e6;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.checkbox input:checked{
  background: #000;
}
.checkbox input:before{
  position: absolute;
  content: "";
  left: 0;
  height: 100%;
  width: 40px;
  background: linear-gradient(#fff,#f2f2f2,#e6e6e6,#d9d9d9);
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
  border-radius: 50px;
  transform: scale(0.85);
  transition: left 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
input:checked:before{
  left: 50px;
}
.checkbox .text:before{
  content: "";
  font-size: 25px;
  font-weight: 500;
  color: #bfbfbf;
}
input:checked ~ .text:before{
  color: #000;
  font-size: 27px;
  content: "";
}

.blog-card-wrap .blog_card .toggle-edit{
    display:flex;
    align-items: center;
    position:absolute;
    top: 100px;
    right:70px;
}
.blog-card-wrap .blog_card .toggle-edit span{
  margin-right:16px;
}

.blog-card-wrap .blog_card .toggle-edit input[type="checkbox"]{
  position: relative;
  border:none;
  -webkit-appearance: none;
  background:#fff;
  outline:none;
  width:80px;
  height:30px;
  border-radius:20px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}
.blog-card-wrap .blog_card .toggle-edit input[type="checkbox"]:before{
  content:"";
  position:absolute;
  width:30px;
  height:30px;
  border-radius:20px;
  top:0;
  left:0;
  background:#303030;
  transform: scale(1.1);
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}

.blog-card-wrap .blog_card .toggle-edit input:checked[type="checkbox"]:before{
  background:#fff;
  left:52px;
}
@media(min-width: 500px){
  .blog-card-wrap{
    padding:100px 16px;
  }
  .blog-card-wrap .blog_card{
    grid-template-columns: repeat(2, 1fr);
  }
}
@media(min-width: 900px){
  .blog-card-wrap .blog_card{
    grid-template-columns: repeat(3, 1fr);
  }
}
@media(min-width: 1200px){
  .blog-card-wrap .blog_card{
    grid-template-columns: repeat(4, 1fr);
  }
}
.blog-card-wrap .blog_card{
  display:grid;
  gap:32px;
  
  /* grid-template-columns: 1fr; */
}
</style>
