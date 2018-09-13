<template>
    <div id="signUp">
        <h1>signUp</h1>
        <form @submit.prevent='signUp'>
        
          <label for="name">Name: 
          <input type="text" name="name" v-model="input.name" placeholder="name" />
          </label>
        
          <label for="password">Password: 
          <input type="password" name="password" v-model="input.password" placeholder="Password"/>
          </label>
        
          <label for="phone">Phone number: 
          <input type="tel" name="phone" v-model="input.phone" placeholder="123-456-7890"/>
          </label>

          <label for="email">Email: 
          <input type="email" name="email" v-model="input.email" placeholder="email"/>
          </label>

          <label for="zip">Zip Code: 
          <input type="text" name="zip" v-model="input.zip" placeholder="zip" />
          </label>
          
          <label for="avatar">Profile picture:
          <input type="file"
               id="avatar" name="avatar"
               accept="image/png, image/jpeg" />
          </label>
          <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
  name: 'signUp',
  data() {
    return {
      input: {
        name: '',
        password: '',
        phone: '',
        email: '',
        zip: '',
        image: '',
      },
    };
  },
  methods: {
    signUp() {
        
    },
  },
};
</script>

<style scoped>
    #signUp {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
