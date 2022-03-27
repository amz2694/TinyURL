<template>
<div class="register-container">
<msg :msg="err" v-if="err" @endmsg="endmsg" />
    <div class="container">
        <div class="tabs">
            <button id="loginTab" class="loginTab" @click="toggleLogin">login</button>
            <button id="signupTab" class="signupTab border-bottom" @click="toggleSignup">sign up</button>
        </div>
        <div class="cart-container">
            <div class="register">
                <div class="login">
                    <p class="text">username :</p>
                    <input type="text" class="reg-input" v-model="username">
                    <p class="text">email :</p>
                    <input type="text" class="reg-input" v-model="email">
                    <p class="text">password :</p>
                    <input type="text" class="reg-input" v-model="pass">
                    <button class='submit' @click="submitRegister">submit</button>
                </div>
            </div>
            <div class="auth none">
                <div class="login">
                    <p class="text">username :</p>
                    <input type="text" class="reg-input" v-model="username">
                    <p class="text">password :</p>
                    <input type="text" class="reg-input" v-model="pass">
                    <button class='submit' @click="submitAuth">submit</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import msg from "./msg.vue"

export default {
  components: { msg },
    data() {
        return {
            username : '',
            email : '',
            pass : '',
            accessToken : '',
            err : ''
        }
    },
    methods : {
        endmsg() {
            this.err ="";
        },
        toggleSignup() {
            document.getElementById('loginTab').classList.remove('border-bottom');
            document.getElementById('signupTab').classList.add('border-bottom');
            document.getElementsByClassName('register')[0].classList.remove('none');
            document.getElementsByClassName('auth')[0].classList.add('none');
            
        },
        toggleLogin() {
            document.getElementById('loginTab').classList.add('border-bottom');
            document.getElementById('signupTab').classList.remove('border-bottom');
            document.getElementsByClassName('auth')[0].classList.remove('none');
            document.getElementsByClassName('register')[0].classList.add('none');
            
        },
        async submitRegister() {
            if (this.username.length || this.email.length || this.pass.length) {
            const registerData = {
                user : this.username,
                email : this.email,
                pwd : this.pass
            }
            await axios 
                .post('https://127.0.0.1:8000/register',registerData)
                .then(res => {
                    console.log("success");
                    this.submitAuth();
                })
                .catch(err => {
                    if (err.response.status == 409) {
                        this.err = "this username already exist"
                        console.log('duplicated');
                    } else {
                        this.err = "something went wrong please try again";
                    }
                })
            } else {
                this.err = "please fill the inputs";
            }
        },
        async submitAuth() {
            if (this.username.length || this.email.length || this.pass.length) {
            const authData = {
                user : this.username,
                pwd : this.pass
            }
            await axios 
                .post('https://127.0.0.1:8000/auth',authData,{withCredentials: true})
                .then(res => {
                    this.accessToken = res.data.accessToken
                    this.$emit('auth',this.accessToken);
                })
                .catch(err => {
                    if (err.response.status == 401) {
                        this.err = "username or password wrong";
                    } else {
                        this.err = "something went wrong please try again";
                    }
                })
            } else {
                this.err = "please fill the inputs";
            }
        }

    }
}
</script>

<style src="../style/auth.css" scoped >

</style>