<template>
<div>
    <h1> heeeeeeeeeeeey {{ shortURL }}</h1>
    <h1 @click="redirectTo">click</h1>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            shortURL : this.$route.params.shortURL
        }
    },
    methods : {
        async redirectTo() {
            console.log(this.shortURL);
            await axios
                .get('http://localhost:8000/short',{ params: {URL: this.shortURL}})
                .then(res => {
                    window.location.href = res.data.realURL;
                })
                .catch(err => {
                    console.log(JSON.stringify(err));
            })
        }
    }
}
</script>

<style>

</style>