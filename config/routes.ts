export default [
  
  {
    name: 'list.table-list',
    icon: 'BookOutlined',
    path: '/list',
    component: './Books',
  },
  {
    path: '/list/:id',
    component: './Books/Detail',
  },
  {
    path: '/',
    redirect: '/list'
  },
  {
    layout: false,
    path: '/login',
    component: './Login'
  },
  {
    component: './404',
  },
];
