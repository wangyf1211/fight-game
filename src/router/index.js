import Vue from 'vue'
import Router from 'vue-router'
import Role from '@/components/Role'
import Skill from '@/components/Skill'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Role',
    component: Role
  }, 
  {
    path: '/skill',
    name: 'Skill',
    component: Skill
  }]
})
