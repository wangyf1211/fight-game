import Vue from 'vue'
import Router from 'vue-router'
import Role from '@/components/Role'
import Skill from '@/components/Skill'
import Start from '@/components/Start'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/role',
    name: 'Role',
    component: Role
  }, 
  {
    path: '/skill',
    name: 'Skill',
    component: Skill
  },
  {
    path: '/',
    name: 'Start',
    component: Start
  }]
})
