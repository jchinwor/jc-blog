<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.loading{
    top:0;
    z-index:101;
    height:100%;
    width:100%;
    background: rgba(0,0,0, 0.5);
    position: fixed;
    display:flex;
    justify-content: center;
    align-items: center;
}
@keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotateZ(360deg);}
}
    
.loading span{
    display:block;
    width:60px;
    height:60px;
    margin: 0 auto;
    border: 3px solid transparent;
    border-top-color:#fff;
    border-bottom-color: #fff;
    border-radius:50%;
    animation: spin ease 1000ms infinite;
}
</style>