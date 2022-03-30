<template>
  <div class="home">
    <Msg :msg="err" v-if="err" @endmsg="endmsg"/>
    <auth @auth="setToken" v-if="showAuth" />
    <div class="shortner-container">
      <p class="text">enter your big URL :</p>
      <div class="input-container">
        <span class="url-input" role="textbox" contenteditable></span>
      </div>
      <div class="input-container" v-show="short" >
        <p class="text short-text">your tiny URL :</p>
        <div class="copy-container">
          <input type="text" id="short" class="url-input copy-input" disabled @click="copy">
          <button @click="copy" class="copy-but">copy</button>
        </div>
      </div>
      <button class='submit' @click="checkToken">Make TinyURL</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import auth from '../components/auth.vue'
import Msg from '../components/msg.vue'

export default {
  name: 'Home',
  components: {auth, Msg},
  data() {
    return {
      short : '',
      accessToken : '',
      showAuth : false,
      err : ''
    }
  },
  methods : {
    copy() {
      var r = document.createRange();
      r.selectNode(document.getElementById("short"));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    },
    endmsg() {
      this.err ="";
    },
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
              this.showAuth = true;
              console.log(err);
              this.err = "something went wrong please try again";
            })
        }
      } else {
          const bigUrl = document.getElementsByClassName('url-input')[0];
          bigUrl.classList.add('ivalid-input');
          setTimeout(()=>{
              bigUrl.classList.remove('ivalid-input');
          },5000)
          this.err = "please fill the inputs";
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
          document.getElementById("short").value =this.short;
        })
        .catch(err => {
          console.log(err);
          this.err = "something went wrong please try again";
        })
    }
  }
}
</script>

<style src="../style/home.css" scoped >

</style>