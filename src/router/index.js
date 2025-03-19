import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistroView from '@/views/RegistroView.vue'
import CitasView from '@/views/CitasView.vue'
import PerfilView from '@/views/PerfilView.vue'
import MenuPrincipalView from '@/views/MenuPrincipalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView
    },
    { path: '/menu',
      name: 'menu',
      component: MenuPrincipalView
    },
    { path: '/perfil',
      name: 'perfil',
      component: PerfilView
    },
    { path: '/citas',
      name: 'citas',
      component: CitasView
    } 
    
  ]
})

export default router
