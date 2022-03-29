<template>
  <div class="head">
    <div class="nav" @click="toggleHelp">
      <span class="help-icon">?</span>
    </div>
    <div class="help" v-if="help" >
      <p class="question">how does it works?</p>
      <p class="answer">enter your big URL in the input and get the tiny version</p>
      <p class="question">how long will my tiny link be avaliable?</p>
      <p class="answer">forever as long as this site up</p>
      <p class="question">why this site?</p>
      <p class="answer">why not :) there is nothing special except no filter on this site</p>
    </div>
  </div>
  <div class="wrapper">
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
  </div>
  <router-view/>
</template>

<script>
export default {
  data() {
    return {
      help : false
    }
  },
  methods : {
    toggleHelp() {
      this.help = !this.help
    }
  }
}
</script>

<style src="./style/app.css">

</style>
