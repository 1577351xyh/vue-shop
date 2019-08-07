<template>
  <div>
    <div class="mui-card" v-for="(item,index) in array" :key="item.Id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!--  这个是滑块按钮 -->
         <mt-switch v-model="$store.getters.getgoodselected[item.Id]" @change="selectrChange(item.Id,$store.getters.getgoodselected[item.Id])"></mt-switch>
          <img :src="item.url" alt class="imgs" />
          <div class="content">
            <div class="title">{{item.title}}</div>
            <div class="body-buttom">
              <span>${{item.price}}</span>
              <!-- 按钮 -->
                <buts :inint="$store.getters.getgoodNum[item.Id]" :goodid="item.Id"></buts>
              <a href="#" @click="remove(index,item.Id)">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner boutts">
            <div class="body">
              <p>总计(不含运费)</p>
              <p>已勾选商品<span class="color">{{$store.getters.getsum.count}}</span>件,总价$<span class="color">{{this.$store.getters.getsum.sums}}</span>元</p>
            </div>
            <div>
                <button type="button" class="mui-btn mui-btn-danger">去结算</button>
            </div>
					</div>
				</div>
			</div>
  </div>
</template>


<script>
import buts from '../buttom/ButtomCar.vue'
export default {
    data() {
        return {
            array :[],
            off:false
        }
    },
    created() {
        this.getinfo();
    },
    methods: {
        //发送ajax请求,根据数据资源里面的对象拿到对应id
        //再通过id去请求mysql数据库,将数据渲染到页面上
        //传一个数组,在服务端进行处理
        getinfo(){
            console.log(this.$store.getters.getgoodNum);
            var arr = [];
            this.$store.state.car.forEach(ele => {
                arr.push(ele.id)
            });
            this.$http.get("http://localhost:3747/carshop/?id="+arr).then(results=>{
                if(results.body.code==200){
                    this.array = results.body.msg;
                }
            })

        },
        remove(index,id){
            this.array.splice(index,1);
            this.$store.commit('removeCar',id)
        },
        sum(){
          //这个方法要从资源数据库中去取到所有的数据,将数据进行累加填到表中
          // this.$store.state.car;
        },
        selectrChange(id,sle){
          this.$store.commit('updaselected',{id:id,isok:sle})
        }
    },
    components:{
        buts
    }
};
</script>

<style lang="scss" scoped>
.mui-card-content {
  .mui-card-content-inner {
    display: flex;
    .mui-switch-mini {
      width: 50px;
      vertical-align: middle;
      top: 14px;
    }
    .imgs {
      width: 60px;
      margin: 0px 6px;
      height: 60px;
    }
    .content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title{
            font-size: 13px;
            font-weight: 700;
        }
        .body-buttom{
            display: flex;
            justify-content: space-around;
            align-items: center;
            span{
                color: red;
                font-size: 14px;
                margin-right: 3px;
            }
            a{
                margin-left: 3px;
            }
        }
    }
  }
}

.boutts{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.color{
  color: red;
}
</style>
