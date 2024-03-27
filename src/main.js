import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import '../styles/global.css'
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import Skeleton from 'primevue/skeleton';
import Carousel from 'primevue/carousel';
import InputSwitch from 'primevue/inputswitch';

window.Slug = require('slug')
Slug.defaults.mode ='rfc3986';



// import slug from '/slug/slug.js';
import 'primevue/resources/themes/nano/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

library.add(fas, far, fab)
dom.watch();
 
const pinia = createPinia();
const app = createApp(App);

// createApp(App).use(PrimeVue)
app.component('QuillEditor', QuillEditor)
app.component("font-awesome-icon", FontAwesomeIcon)
app.component('Button', Button)
app.component('Skeleton', Skeleton)
app.component('Carousel', Carousel)
// app.component('slug', slug)


app.component('InputSwitch', InputSwitch)

app.use(pinia)
app.use(router)
app.use(PrimeVue)

app.mount('#app')
