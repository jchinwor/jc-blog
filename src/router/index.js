import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogList from '../views/BlogList.vue'
import Admin from '../views/Admin.vue'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title:'Home'
      }
  },
  {
    path: '/Add-Admin',
    name: 'Admin',
    component: Admin,
    meta:{
      title:'Admin',
      requiresAuth:true,
      }
  },
  {
    path: '/createpost',
    name: 'createpost',
    meta:{
      title:'Create Post',
      requiresAuth:true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/CreatePost.vue')
  },
  {
    path: '/edit/:blogid',
    name: 'edit',
    meta:{
      title:'edit Post',
      requiresAuth:true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/EditPost.vue')
  },
  {
    path: '/password-reset',
    name: 'forgotpassword',
    meta:{
      title:'Password Reset'
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/ForgotPassword.vue')
  },
  // {
  //   path: '/blog/post',
  //   name: 'blog',
  //   component: BlogList,
  //   meta:{
  //     title:'Blogs'
  //      }
  // },
  {
    path: '/login/',
    name: 'login',
    meta:{
          title:'Login'
      },
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/Blogs/:slug/:blogid',
    name: 'blog',
    props: true,
    meta:{
          title:'Blog'
      },
    component: () => import(/* webpackChunkName: "about" */ '../views/Blog.vue')
  },
  {
    path: '/Blogs/',
    name: 'bloglist',
    meta:{
          title:'Blog'
      },
    component: () => import(/* webpackChunkName: "about" */ '../views/BlogList.vue')
  },
  {
    path: '/user/profile',
    name: 'Profile',
    meta:{
          title:'Profile',
          requiresAuth:true,
          
      },
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/register/',
    name: 'register',
    meta:{
      title:'Register'
      },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  }
})


 router.beforeEach(async (to, from, next) =>{

  document.title = `${to.meta.title} :: JBLOG` ; 

    let user = firebase.auth().currentUser;
    let admin = null;

    if(user){
      let token = await user.getIdTokenResult();
      admin = token.claims.admin;
    }
    if(to.matched.some((res) => res.meta.requiresAuth)){
      if(user){
          if(to.matched.some((res) => res.meta.requiresAdmin)){

            if(admin){
              return next()
            }
            return next({ name: "home"})

          }

          return next();
      }
      return next({ name: "home"})
    }

    return next();
 });

export default router
