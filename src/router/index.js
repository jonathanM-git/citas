import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistroView from '@/views/RegistroView.vue'
import CitasView from '@/views/CitasView.vue'
import PerfilView from '@/views/PerfilView.vue'
import MenuPrincipalView from '@/views/MenuPrincipalView.vue'
import CentersView from '@/views/CentersView.vue'

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
    },
    { path: '/centers',
      name: 'centers',
      component: CentersView
    },

    
  ]
})

export default router
