<template>
  <div class="home">
    <auth @auth="setToken" v-if="showAuth" />
   <input type="text" name="getURL" id="getURL" v-model="url">
   <button @click="checkToken">submit</button>
  </div>
</template>

<script>
import axios from 'axios'
import auth from '../components/auth.vue'

export default {
  name: 'Home',
  components: {auth},
  data() {
    return {
      url : '',
      short : '',
      accessToken : '',
      showAuth : true
    }
  },
  methods : {
    setToken(token) {
      this.accessToken = token;
      this.checkToken();
    },
    async checkToken() {
      if (!this.accessToken) {
        this.showAuth = true
      } else {
        await axios
          .get('https://127.0.0.1:8000/refresh', {withCredentials: true})
          .then(res => {
            this.accessToken = res.data.accessToken
            this.submitURL();
            this.showAuth = false;
          })
          .catch(err => {
            this.showAuth = true
            console.log(err)
          })
      }
    }
    ,
    async submitURL() {
      const config = {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      };
      await axios
        .post('https://127.0.0.1:8000/short',{"URL": this.url},config)
        .then(res => {
          this.short = res.data.shortURL;
          console.log(`success ${this.short}`);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style>

</style>