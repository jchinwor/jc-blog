<template>
   <div
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="toggleActive"
    :class="{ 'active-dropzone': active }"
    class="dropzone"
  >
    <span>Drag or Drop File</span>
    <span>OR</span>
    <label for="dropzoneFile">Select File</label>
    <input type="file" id="dropzoneFile" class="dropzoneFile" accept=".png, .jpg, .jpeg" required/>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {

    setup(){
     const active = ref(false);
    const toggleActive = () => {
      active.value = !active.value;
    };
    return { active, toggleActive };

          
        }
}
</script>

<style>
.dropzone{
       padding:20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 16px;
      border: 2px dashed #f6c67f;
      background-color: #fff;
      transition: 0.3s ease all;
  }
.dropzone label{
         padding: 10px 12px;
        color: #fff;
        background-color: #ff9700;
        transition: 0.3s ease all;
    }
 .dropzone input{
        display: none;
    }
 .active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: #ff9700;
    }
.active-dropzone label{
background-color: #fff;
color: #ff9700;


}
</style>