<template>
    <div id="signUp">
        <h1>signUp</h1>

        <div>
          <label for="name">Name: </label>
          <input type="text" name="name" v-model="input.name" placeholder="name" />
        </div>
        <div>
          <label for="password">Password: </label>
          <input type="password" name="password" v-model="input.password" placeholder="Password"/>
        </div>
        <div>
          <label for="phone">Phone number: </label>
          <input type="tel" name="phone" v-model="input.phone" placeholder="123-456-7890"/>
        </div>
        <div>
          <label for="email">Email: </label>
          <input type="email" name="email" v-model="input.email" placeholder="email"/>
        </div>
        <div>
          <label for="zip">Zip Code: </label>
          <input type="text" name="zip" v-model="input.zip" placeholder="zip" />
        </div>
        <div>
        <label for="avatar">Profile picture:</label>
        <input type="file"
               id="avatar" name="avatar"
               accept="image/png, image/jpeg" />
        </div>
        <div>
          <button type="button" v-on:click="signUp()">Submit</button>
        </div>
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
      if (this.input.name !== '' && this.input.name !== ''
      && this.input.password !== '' && this.input.phone !== ''
      && this.input.email !== '' && this.input.zip !== ''
      && this.input.image !== ''){
          
      }
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
