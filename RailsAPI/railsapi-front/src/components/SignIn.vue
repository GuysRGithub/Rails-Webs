<template>
<div class="form">
        <h2>Login</h2>
        <div class="input">
            <div class="inputBox">
                <label>Username</label>
                <input type="text" placeholder="example@gmail.com">
            </div>
            <div class="inputBox">
                <label>Password</label>
                <input type="text" placeholder="12345">
            </div>
            <div class="inputBox">
                <input type="submit" value="SignIn">
            </div>
        </div>
        <p class="forget">Forget Password ?<a href="#">Click Here</a></p>
    </div>
  <!-- <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <h3 class="tetxt-2xl mb-6 text-grey-darkest">Sign In</h3>
      <form @submit.prevent="signin">
        <div class="text-red" v-if="error">{{error}}</div>
        <div class="mb-6">
          <label for="email" class="label">E-mail Address</label>
          <input
            type="email"
            v-model="email"
            class="input"
            id="email"
            placeholder="youremail@gmail.com"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input
            type="password"
            v-model="email"
            class="input"
            id="password"
            placeholder="youremail@gmail.com"
          />
        </div>

        <button
          type="submit"
          class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bggreen-dark w-full py-4 text-white items-center justify-center"
        >Sign In</button>

        <div class="my-4">
          <router-link to="/signup" class="link">Sign Up</router-link>
        </div>
      </form>
    </div>
  </div> -->
</template>
<style src="@/components/SignInStyle.css"> </style>
<script>
export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccesful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccesful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }

      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/records')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/records')
      }
    }
  }
}
</script>
