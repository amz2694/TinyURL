<template>
  <div class="msg-container">
      <span class="msg">{{ msg }}</span>
  </div>
</template>

<script>
export default {
    props : ['msg'],
    mounted () {
      setTimeout(()=>{
        this.$emit('endmsg');
      },5000)
    }
}
</script>

<style src="../style/msg.css">

</style>