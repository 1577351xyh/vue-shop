<template>
  <div>
	  <transition
	  @befor-enter = "beforeEnter"
		@enter="enter"
		@after-enter="afterEnter">
	  <div class="boxball" v-if="off" ref="boxball"></div>
	  </transition>
	



    <div class="mui-card">
      <div class="mui-card-header">商品图片</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swipe :listArr="arr"></swipe>
        </div>
      </div>
    </div>

    <div class="mui-card mui-card-1">
      <div class="mui-card-header">商品价格</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner mui-card-content-inner-1">市场价: ${{obj.odl_price}}</div>
        <div class="mui-card-content-inner mui-card-content-inner-2">销售价: ${{obj.price}}</div>
        <div class="mui-card-content-inner">
          购买数量: <buttons @getcount="changes"></buttons>
        </div>
      </div>
      <div class="mui-card-content-inner">
        <button type="button" class="mui-btn mui-btn-primary">立即购买</button>
        <button type="button" class="mui-btn mui-btn-danger" @click="add">加入购物车</button>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">商品货号:{{obj.goods}}</div>
        <div class="mui-card-content-inner">库存情况:{{obj.quantity}}</div>
        <div class="mui-card-content-inner">上架时间:{{obj.time}}</div>
      </div>
      <div class="mui-card-footer">
        <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined" @click="photos(obj.id)">图文介绍</button>
        <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined" @click="contents(obj.id)">商品评论</button>
      </div>
    </div>
  </div>
</template>

<script>
import swipe from "../tabbar/swipe/swipe.vue";
import buttons from "../buttom/Buttom.vue"
export default {
  data() {
    return {
		  id: this.$route.params.id, 
		  arr: [],
		  obj: {},
      off: false,
      select: 1
    };
  },
  created() {
	this.getinfo();
	this.getlistinfo();
  },
  methods: {
    getinfo() {
      this.$http.get("http://127.0.0.1:3747/").then(results => {
        if (results.body.code === 200) {
          this.arr = results.body.msg;
        }
      });
    },
    getlistinfo() {
      this.$http.get("http://127.0.0.1:3747/goodinfo/?id="+this.id).then(results => {
        if (results.body.code === 200) {
			this.obj = results.body.msg[0];
        }
      });
	},
	photos(id){
		this.$router.push({name:'des',params:{id:id}})
	},
	contents(id){
		this.$router.push({name:'comments',params:{id:id}})
	},
	add(){
    this.off = !this.off;
    //设计存储购物情况的数据
    var goodinfo = {
      //唯一id标识符
      id : this.id,
      //价格
      price: this.obj.price,
      //数量
      num:this.select,
      //是否选中(点击后默认是选中状态)
      isok:true
    }
  this.$store.commit('addcar',goodinfo)
	},
	beforeEnter(el) {
		el.style.transform = 'translate(0,0)'
	},
	enter(el,done){
    //解决小球的兼容性问题
    //三大家族offset解决方案
    // const ballx=  this.$refs.boxball.offsetLeft;
    // console.log(ballx);

    //api获取一个矩形对象
    //球
    const ball =this.$refs.boxball.getBoundingClientRect();
    let num = document.getElementById('nums');
    //灰标
    var nums = num.getBoundingClientRect();

    let x = nums.left - ball.left;
    let y = nums.top - ball.top;
		el.offsetWidth;
		el.style.transform =`translate(${x}px,${y}px)`;
		el.style.transition = 'all 1s cubic-bezier(.17,.67,.83,.67)';
		done()
	},
	afterEnter(el){
		this.off = !this.off;
  },
  changes(index){
    this.select = index;
    console.log("父组件收到的"+  index);
    // console.log("父组件收到的"+ this.select);
  }

  },

  components: {
    swipe,
    buttons
  }
};
</script>

<style lang="less" scoped>
.mui-card-1 {
  .mui-card-content {
    .mui-card-content-inner-1,
    .mui-card-content-inner-2 {
      display: inline-block;
      color: rgb(20, 18, 18);
      text-decoration: none;
    }
    .mui-card-content-inner-2 {
      color: red;
      font-weight: 700;
    }
  }
}
.mui-btn-outlined {
  width: 60%;
  font-size: 16px;
  font-weight: 700;
}
.boxball{
	width: 18px;
	height: 18px;
	border-radius: 50%;
	z-index:88;
	background-color: red;
	position: absolute;
	top: 487px;
	left:140px;

}
</style>

