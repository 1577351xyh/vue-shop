//入口文件
import Vue from 'vue'
//导入app根组件
import App from './App.vue'
//导入路由模块
import VueRouter from 'vue-router';//(路由模块)
//安装路径
Vue.use(VueRouter)

//注册vuex
import Vuex from 'vuex';
Vue.use(Vuex)
//vuex实例对象

var car = JSON.parse(localStorage.getItem('car')||'[]');
var store = new Vuex.Store({
    state:{//this.$store.state.名称
        car:car //将购物车中的数组,用一个数组存储起来 { id:xxx,count:数量,price:单价,selected: true(是否被选中)}
    },
    mutations:{//this.$store.commit('名称')
        //处理添加的数据,把信息保存到数据共享库中
        addcar(state,goodinfo){
            //0.假设从来没被选中过
            var off = false;
                //2.如果这个商品已经被选中过
                //1.只要处理新添加的购买数量即可
                for(var i = 0; i < state.car.length;i++){
                    if(state.car[i].id == goodinfo.id){
                        state.car[i].num += parseInt(goodinfo.num);
                        off=true;
                    }
                }
            //1.如果这个商品没有被选中
            //2.将这个对象作为一个新对象加入数组中
                if(!off){
                    state.car.push(goodinfo);
                }
                //把car数组存储到本地的localStorage中
                localStorage.setItem('car',JSON.stringify(state.car))
        },
        //把当前选中的id中的num值替换成更改后的value值
        updataGoodcar(state,goodid){
            for(var i = 0; i<state.car.length;i++){
                if(state.car[i].id==goodid.id){
                    state.car[i].num = parseInt(goodid.num);
                }
            }
            //把最新的数据保存在本地存储中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        //删除订单
        removeCar(state,id){
            //some写法
            //some 为数组中的每一个元素执行一次 callback 函数，
            // 直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。
            // 如果找到了这样一个值，some 将会立即返回 true。
            // state.car.some(item,i)=>{
            //     if(item==id){
            //         state,car.splice(i,1)
            //         return true;
            //     }
            // }
            ///--------------------------------
            // state.car.forEach((ele,index)=>{
            //     if(ele.id==id){
            //         ele[].splice(index,1);
            //     }
            // })
            ///--------------------------------

            for(var i = 0; i < state.car.length;i++){
                if(state.car[i].id == id){
                    state.car.splice(i,1);
                }
            }
            localStorage.setItem('car',JSON.stringify(state.car));

        },
        //更新按钮的状态
        updaselected(state,obj){
            //如果传过来的id跟car的id一样,那就把传过来的状态保存到car里面
            for(var i = 0; i < state.car.length;i++){
         
                if(obj.id === state.car[i].id){
                    console.log(obj.isok)
                    state.car[i].isok = obj.isok;
                    console.log(state.car[i].isok)
                    console.log(state.car);
                }
            }
            //把最新商品的所有状态保存到本地中
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{//this.$store.getters.名称
        //可以理解为这是一个计算属性
        getmax(state){
            var c =0 ;
            for(var i = 0;i<state.car.length;i++){
            
            c += state.car[i].num;
            }
            return c;
        },
        //将购物车里面的商品数据作为对象给外面进行调用
        //1.循环购物车里面的数据,把当前的id作为键, num的值作为id的值
        //2.通过id找到对应的num值
        getgoodNum(state){
            var obj ={};
            state.car.forEach(ele => {
                obj[ele.id] = ele.num;
            });
            return obj
        },
          //给当前的按钮绑定一个状态
          getgoodselected(state){
            var objs={};
            state.car.forEach(item=>{
                objs[item.id]=item.isok;
            })
            return objs;
        },
        //根据商品的isok状态实现自动计算商品总价和件数
        getsum(state){
            var o= {
                //勾选的数量
                count:0,
                sums:0
                //勾选的总监
            }
            state.car.forEach(item=>{
                if(item.isok){
                    o.count+= item.num;
                    o.sums+= item.price * item.num;
                }
            })
            return o;
        }
    }
})

//导入vue - resource(发送请求)
import VueResource from 'vue-resource'
//安装
Vue.use(VueResource)

//导入格式化时间插件
import moment from 'moment';
//定义全局的过滤器,处理时间
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
})

//mint-ui组件
import { Header, Swipe, SwipeItem, Button ,Lazyload ,Switch } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
Vue.component(Switch.name, Switch);
//导入mui的css文件
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入路由模块
import router from './router'


var vm = new Vue({
    el: '#app',
    render: c => c(App),
    // render:function(creaElement){
    //     return creaElement(App);
    // }
    //挂载路由对象
    router,
    //挂载store状态管理
    store
})