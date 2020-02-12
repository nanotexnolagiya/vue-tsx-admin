export default [
  {
    path: '/',
    name: 'front',
    component: () => import('../pages/front/index'),
    meta: {
      private: false,
      layout: 'dashboard'
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../pages/front/index'),
        meta: {
          private: false,
          layout: 'dashboard'
        },
      }
    ]
  }
]
