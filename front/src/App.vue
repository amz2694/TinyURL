<template>
  <div class="head">
    <div class="nav" @click="toggleHelp">
      <span class="help-icon">?</span>
    </div>
    <div class="help" v-if="help" >
      <p class="question">how does it works?</p>
      <p class="answer">Enter your big URL in the input box and get the tiny version of it.</p>
      <p class="question">How long will the tiny link be avaliable?</p>
      <p class="answer">As long as this website is up and running, you can use the tiny link.</p>
      <p class="question">Why this website?</p>
      <p class="answer">It's as fast as a URL shortener can get.</p>
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
