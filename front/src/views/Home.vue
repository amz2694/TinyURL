<template>
  <div class="home">
    <auth @auth="setToken" v-if="showAuth" />
    <div class="shortner-container">
      <p class="text">enter your big boy (URL) :</p>
      <div class="input-container">
        <span class="url-input" role="textbox" contenteditable></span>
      </div>
      <p class="err" >please fill the input</p>
      <button class='submit' @click="checkToken">submit</button>
    </div>
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
      short : '',
      accessToken : '',
      showAuth : false
    }
  },
  methods : {
    setToken(token) {
      this.accessToken = token;
      this.checkToken();
    },
    async checkToken() {
      if (document.getElementsByClassName('url-input')[0].textContent) {
        if (!this.accessToken) {
          this.showAuth = true
        }else {
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
      } else {
          document.getElementsByClassName('err')[0].style.display = "block";
      }
    }
    ,
    async submitURL() {
      let url = document.getElementsByClassName('url-input')[0].textContent
      const config = {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      };
      await axios
        .post('https://127.0.0.1:8000/short',{"URL": url},config)
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

<style src="../style/home.css" scoped >

</style>