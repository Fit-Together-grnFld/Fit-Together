<template>
    <div id="login">
        <h1>signUp</h1>
        <input type="text" name="name" v-model="input.username" placeholder="name" />
        <input type="password" name="password" v-model="input.password" placeholder="Password"/>
        <input type="number" name="phone" v-model="input.username" placeholder="phoneNumber" />
        <input type="email" name="email" v-model="input.password" placeholder="email"/>
        <input type="text" name="name" v-model="input.username" placeholder="name" />
        <input type="password" name="password" v-model="input.password" placeholder="Password"/>
        <input type="image">
        <button type="button" v-on:click="signUp()">Submit</button>
        
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            signUp() {
                
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>