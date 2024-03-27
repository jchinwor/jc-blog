<template>
  <div class="modal">
        <div class="modal-content">
              <p>
                {{ modalMessage }}
               
            </p>
             <button class="btn btn-dark" @click="closeModal">close</button>
        </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props: ["modalMessage"],
   setup(props,data){
        const closeModal = () =>{
            data.emit("close-modal",event.target.value)
        }

        return { closeModal }
   }
}
</script>

<style>
.modal{
    display:flex;
    justify-content: center;
    align-items: center;
    z-index:101;
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    background:rgba(0,0,0, 0.7)
}
.modal .modal-content{
    display:flex;
    flex-direction:column;
    justify-content: center;
    border-radius:8px;
    width:300px;
    padding: 40px 30px;
    background: #fff;
}
.modal .modal-content p{
    text-align:center;
}
.modal .modal-content button{
    align-self:center;
}
</style>