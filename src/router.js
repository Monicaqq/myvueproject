import Vue from 'vue'
// 1.导入vue-router包
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 3.创建路由对象
var router = new VueRouter({
    routes:[
        {path:'/login',component:app}
    ]
})

export default router