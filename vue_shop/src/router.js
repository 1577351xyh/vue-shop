import VueRouter from 'vue-router'

//导入路由组件
import HomeCon from './components/tabbar/HomeCon.vue';
import ShopCon from './components/tabbar/ShopCon.vue';
import SeachCon from './components/tabbar/SeachCon.vue';
import MenberCon from './components/tabbar/MenberCon.vue';
import Newlist from './components/news/Newlist.vue';
import Newinfo from './components/news/Nesinfo.vue';
import Photo from './components/photo/Photolist.vue';
import photoinfo from './components/photo/Photoinfo.vue';
import goodslist from './components/goodslist/Goodslist.vue'
import goodinfo from './components/goodslist/Goodinfo.vue'
import goodDes from './components/goodslist/GoodDes.vue'
import comments from './components/goodslist/Goodcomment.vue'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [//配置路由规则
    { path: '/', component: HomeCon },
    { path: '/home', component: HomeCon },
    { path: '/shopcar', component: ShopCon },
    { path: '/search', component: SeachCon },
    { path: '/menber', component: MenberCon },
    { path: '/home/newlist', component: Newlist },
    { path: '/home/newsinfo/:id', component: Newinfo },
    { path: '/home/photolist', component: Photo },
    { path: '/home/photo/info/:id', component: photoinfo },
    { path: '/home/goodslist', component: goodslist },
    { path: '/home/goodinfo/:id', component: goodinfo, name: 'info' },
    { path: '/home/gooddes/:id', component: goodDes, name: 'des' },
    { path: '/home/comments/:id', component: comments, name: 'comments' },

  ],
  linkActiveClass: 'mui-active' //覆盖默认高亮的类
})

// 把路由对象暴露出去
export default router