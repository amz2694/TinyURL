<template>
<auth v-if="showRegister"/>
  <div class="head">
    <div class="nav" @click="toggleHelp">
      <span class="help-icon">?</span>
    </div>
    <div class="help" v-if="help" >
      <p class="question">how it works?</p>
      <p class="answer">enter your big URL in the input and get the short version</p>
      <p class="question">how long will my short link be avaliable?</p>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
