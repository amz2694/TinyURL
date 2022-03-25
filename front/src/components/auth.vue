<template>
<div class="register-container">
    <div class="register">
        <div class="login">
        <p class="text">username :</p>
        <input type="text" class="reg-input" v-model="username">
        <p class="text">email :</p>
        <input type="text" class="reg-input" v-model="email">
        <p class="text">password :</p>
        <input type="text" class="reg-input" v-model="pass">
        <p class="err" >خطایی رخ داده لطفا مجددا تلاش کنید</p>
        <button class='submit' @click="submitRegister">ثبت</button>
        </div>
    </div>
    <div class="auth">
        <div class="login">
        <p class="text">username :</p>
        <input type="text" class="reg-input" v-model="username">
        <p class="text">password :</p>
        <input type="text" class="reg-input" v-model="pass">
        <p class="err" >خطایی رخ داده لطفا مجددا تلاش کنید</p>
        <button class='submit' @click="submitAuth">ثبت</button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username : '',
            email : '',
            pass : '',
            accessToken : ''
        }
    },
    methods : {
        async submitRegister() {
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
                        console.log('duplicated');
                    } else {
                        console.log(err);
                    }
                })
        },
        async submitAuth() {
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
                        console.log('no username found');
                    } else {
                        console.log(err);
                    }
                })
        }
    }
}
</script>

<style>
.login {
    width: 616px;
    background: white;
    border-radius: 10px;
    text-align: right;
    /* display: none; */
}

.phone {
    display: block;
}

.register-container {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 35px 0;
}

.title {
    margin-top: 33px;
    margin-right: 28px;
    font-weight: 500px;
    font-size: 30px;
    color: #282828;
}

.text {
    margin-top: 20px;
    margin-right: 40px;
    margin-bottom: 0;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.63);
}

.reg-input {
    padding-right: 3%;
    margin-top: 16px;
    margin-right: 30px;
    width: 536px;
    height: 62px;
    border: 1px solid rgba(0, 0, 0, 0.38);
    border-radius: 10px;
    direction: rtl;
    font-size: 20px;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
}

.carin-container {
    direction: rtl;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.car-input {
    background-color: #FFFFFF;
    padding-right: 3%;
    margin-top: 16px;
    margin-right: 30px;
    width: 260px;
    height: 62px;
    border: 1px solid rgba(0, 0, 0, 0.38);
    border-radius: 10px;
    direction: rtl;
    font-size: 20px;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
}

.err {
    margin-top: 8px;
    margin-right: 40px;
    font-size: 18px;
    color: #DC3755;
    display: none;
}

.privacy {
    margin-top: 22px;
    margin-right: 40px;
    margin-bottom: 0;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.8);
}

.submit {
    width: 306px;
    height: 67px;
    background: #0054A6;
    border-radius: 50px;
    border: none;
    margin: 18px 155px;
    color: white;
    font-weight: bold;
    font-size: 22px;
    box-shadow: 0 1rem 3rem rgb(0, 0, 0, 0.35)
}

.edit-text {
    margin-top: 18px;
    margin-right: 8px;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.63);
}

.edit-icon {
    margin-top: 27px;
    margin-right: 40px;
}

.resend-container {
    direction: rtl;
    display: flex;
    justify-content: space-between;
}

.msg {
    margin-top: 18px;
    margin-right: 8.5%;
}

.resendbut-container{
    margin-top: 18px;
    margin-left: 8.5%;
}

.timer {
    margin-right: 10px;
}

.resend {
    cursor: not-allowed;
    background-color: white;
    border: none;
    color: #696969;
}

.active {
    cursor: pointer;
    color: #0054A6;
}

.forgot {
    margin-top: 38px;
    margin-bottom: 0;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: #2EA49F;
}

@media screen and (max-width: 768px) {
    .login {
        width: 90%;
        background: white;
        border-radius: 10px;
        text-align: right;
        display: none;
    }
    .phone {
        display: block;
    }
    .carin-container {
        width: 100%;
    }
    .select-container {
        width: 100%;
    }
    .car-input {
        width: 83%;
        margin: 16px 8.5%;
    }
    .reg-input {
        width: 80%;
        margin: 16px 8.5%;
    }
    .submit {
        width: 50%;
        margin: 16px 25%;
        font-size: 18px;
    }
    .text {
        margin-top: 20px;
    }
}
</style>