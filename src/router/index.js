import Vue from 'vue'
import Router from 'vue-router'
import Role from '@/components/Role'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Role',
      component: Role
    }
  ]
})
