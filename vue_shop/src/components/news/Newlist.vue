
<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newlistArr" :key="item.id">
        <router-link :to="'/home/newsinfo/'+ item.id">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img"/>
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis">
              <span>发表时间:{{item.time | dateFormat}}</span>
              <span>点击:{{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            newlistArr:[]
        }
    },
    created() {
        this.getNewlist();
    },
    methods: {
        getNewlist(){
        this.$http.get("http://127.0.0.1:3747/newlist").then(results=>{
            if(results.body.code===200){
            this.newlistArr = results.body.msg;
            }
        })
        }
    },

};
</script>
<style lang="scss" scoped>
.mui-table-view{
    li{
        .mui-media-body{
            font-size: 14px;
            .mui-ellipsis{
                display: flex;
                justify-content: space-between;
                span{
                    font-size:12px;
                    color: blue;
                }
            }
        }
    }
}


</style>

