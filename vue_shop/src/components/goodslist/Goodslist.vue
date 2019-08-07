<template>
  <div class="goodslist">

   
    <div class="goodslist_shop" v-for="item in list" :key="item.id" @click="getinfo(item.id)">
      <img
        :src="item.url"
        alt
      />
      <p>{{item.title}}</p>
      <div class="goodslist_shop_body">
        <div class="money">
          <span class="hot">${{item.price}}</span>
          <span class="old">${{item.odl_price}}</span>
        </div>
        <div class="shop">
          <span>热卖中</span>
          <span>剩{{item.quantity}}件</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[]
    }
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist(){
      this.$http.get("http://127.0.0.1:3747/goodslist").then(results=>{
        if(results.body.code===200){
          this.list= results.body.msg;
        }else{
          console.log("获取失败")
        }
      })
    },
    getinfo(id){
      //根据路由的名字来跳转对应的路由url
      //this.$route是路由参数对象,所有的路由中的参数,params,query属于他
      //this.router是一个路由导航对象,用来考验方便的使用js代码实现路由的前进后退,跳转到新的url地址
      this.$router.push({ name: 'info', params: { id: id }})
    }
  },


};
</script>

<style lang="scss" scoped>
.goodslist {
  background-color: #fff;
  display: flex;
  padding: 5px;
  flex-wrap: wrap;
  justify-content: space-between;
  .goodslist_shop {
    border: 1px solid #ccc;
    width: 49%;
    margin-bottom: 5px;
    box-shadow: 0 0 6px #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 170px;

    img {
      max-height: 180px;
      width: 100%;
    }
    p {
      font-size: 12px;
    }
    .goodslist_shop_body {
        background-color: #ccc;
        padding: 0px 5px;
        .money{
           
            margin-bottom: 5px;
            .old{
                font-size: 12px;
                text-decoration: line-through;
            }
            .hot{
                color: red;
                margin-right: 10px;
                font-size: 16px;
            }
        }
        .shop{
             display: flex;
            justify-content: space-between;
            span{
                font-size: 12px;
            }
        }
    }
  }
}
</style>