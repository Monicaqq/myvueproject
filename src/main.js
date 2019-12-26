// 入口文件
import Vue from 'vue'

// 导入App 根组件
import app from './App.vue'
// 按需导入Mint-UI 
import { Header, Tabbar, TabItem } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Tabbar.name,Tabbar)
Vue.component(TabItem.name,TabItem)

import 'mint-ui/lib/style.css'

import 'bootstrap/dist/css/bootstrap.css'
import './lib/MUI/css/mui.min.css'
import './lib/MUI/css/mui.css'

import router from './router.js'
var vm = new Vue({
    el:'#app',
    data:{},
    methods:{},
    render:c=>c(app),

})