<template>
<div>
    <div class="container">
        <span class="timer" id="timer" v-if="!msg">{{ timer }}</span>
        <span class="msg" v-if="msg">{{ msg }}</span>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            msg : '',
            intervalVar : null,
            timer : 5,
        }
    },
    mounted() {
        this.interval()
    },
    watch : {
        $route(to,from) {
            if (to.name == "redirect") {
                this.interval()
            }
        }
    },
    methods : {
        interval () {
            this.msg = '';
            this.intervalVar = setInterval(() => {
                this.timer -= 1;
                if (this.timer<=0) {
                    this.timer = 5;
                    this.redirectTo();
                    clearInterval(this.intervalVar);
                }
            }, 1000);
        },
        async redirectTo() {
            const shortURL = this.$route.params.shortURL;
            console.log(shortURL);
            await axios
                .get('https://localhost:8000/short',{ params: {URL: shortURL}})
                .then(res => {
                    this.msg = "Redirecting ...";
                    window.location.href = res.data.realURL;
                })
                .catch(err => {
                    if (err.response.status == 404) {
                        this.msg = "shortURL not found";
                    } else {
                        this.msg = "something went wrong please try again";
                        console.log(err);
                    }
            })
        }
    }
}
</script>

<style src="../style/redirect.css" scoped>

</style>