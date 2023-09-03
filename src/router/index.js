import { createRouter, createWebHistory } from 'vue-router'
import { useAuthUserStore } from '@/store/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/dashboard/index.vue'),
          meta: {
            authOnly: true,
          },
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('../views/product/index.vue'),
          meta: {
            authOnly: true,
          },
        },
        {
          path: 'product/edit/:id',
          name: 'product-edit',
          component: () => import('../views/product/edit.vue'),
          meta: {
            authOnly: true,
          },
        },
        {
          path: 'product/:id',
          name: 'product-detail',
          component: () => import('../views/product/detail.vue'),
          meta: {
            authOnly: true,
          },
        },
        {
          path: 'product/add',
          name: 'product-create',
          component: () => import('../views/product/create.vue'),
          meta: {
            authOnly: true,
          },
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/login.vue'),
          meta: {
            guestOnly: true,
          },
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../views/error/[...all].vue'),
        },
      ],
    },
  ],
})

function haveToken () {
  const auth = useAuthUserStore()

  return !!(auth.token)
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly) && !haveToken()) {
    next({
      path: "login",
    })
  } else if(to.matched.some(record => record.meta.guestOnly) && haveToken()){
    next({
      path: 'dashboard',
    })
  } else {
    next()
  }
})

export default router
