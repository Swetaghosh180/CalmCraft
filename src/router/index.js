import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Quiz from '../views/Quiz.vue'
import Recommendations from '../views/Recommendations.vue'
import HobbyDetail from '../views/HobbyDetail.vue'
import CalmSpace from '../views/CalmSpace.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/quiz', name: 'Quiz', component: Quiz },
  { path: '/recommendations', name: 'Recommendations', component: Recommendations },
  { path: '/hobby/:id', name: 'HobbyDetail', component: HobbyDetail },
  { path: '/calm-space', name: 'CalmSpace', component: CalmSpace },
  { path: '/about', name: 'About', component: About }
]

export default createRouter({
  history: createWebHistory(),
  routes
})