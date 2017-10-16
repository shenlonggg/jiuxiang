import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import home from '@/components/home'
import main from '@/components/main'
import table from '@/components/nav1/table'
import form from '@/components/nav1/form'
import liebiao from '@/components/nav1/liebiao'
import shuju from '@/components/nav2/shuju'
import suanfa from '@/components/nav2/suanfa'
import photo from '@/components/nav3/photo'
import liuyan from '@/components/nav3/liuyan'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      hidden:true
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      hidden:true
    },
    {
        path: '/',
        component: home,
        name: '导航一',
        iconimg:'glyphicon glyphicon-envelope',
        children:[
             { path: '/main', component: main, name: 'Main'},
             { path: '/table', component: table, name: 'Table'},
             { path: '/form', component: form, name: 'Form'},
             { path: '/liebiao', component: liebiao, name: '列表'}
        ]
    },
    {
        path: '/',
        component: home,
        name: '导航二',
        iconimg:'glyphicon glyphicon-align-right',
        children:[
             { path: '/shuju', component: shuju, name: '数据'},
             { path: '/suanfa', component: suanfa, name: '算法'}
        ]
    },
    {
        path: '/',
        component: home,
        name: '导航三',
        iconimg:'glyphicon glyphicon-picture',
        children:[
             { path: '/photo', component: photo, name: '相册'},
             { path: '/liuyan', component: liuyan, name: '留言信息'}
        ]
    },
    {
        path: '/',
        component: home,
        iconimg:'glyphicon glyphicon-globe',
        name: 'Charts',
    }
  ]
})
