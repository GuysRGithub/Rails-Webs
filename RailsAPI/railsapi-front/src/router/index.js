import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn
    }
  ]
})
