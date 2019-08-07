<template>
  <div>
    <!-- 导航栏 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==1?'mui-active':'']"
            href="#item1mobile"
            data-wid="tab-top-subpage-1.html"
            v-for="item in arr"
            :key="item.id"
            @tap="getList(item.id)"
          >{{item.nav}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表 -->
    <ul class="listphoto">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photo/info/' + item.id" tag="li">
        <img v-lazy="item.url" class="images" />
        <div class="info">
          <h3>{{item.title}}</h3>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>


<script>
import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      arr: [], //nav导航的数据数组
      list: [] //图片列表的数据数组
    };
  },
  //实例创建成功,此时,data有数据
  created() {
    this.getNav();
    this.getList(1); //默认加载全部
  },
  methods: {
    getNav() {
      this.$http.get("http://127.0.0.1:3747/photolist/nav").then(results => {
        if (results.body.code === 200) {
          this.arr = results.body.msg;
        }
      });
    },
    getList(cateid) {
      if (cateid == 1) {
        this.$http.get("http://127.0.0.1:3747/photolist/max").then(results => {
          if (results.body.code === 200) {
            this.list = results.body.msg;
          }
        });
      } else {
		  console.log(cateid)
        this.$http
          .get("http://127.0.0.1:3747/photolist/index?id=" + cateid)
          .then(results => {
            if (results.body.code === 200) {
			  this.list = results.body.msg;
			  
			  console.log(this.list);
            }
          });
      }
    }
  },
  // 挂载真实DOM,data中的数据被渲染
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
  list-style: none;
}
.listphoto {
  padding: 10px;
  margin: 0;
  li {
    box-shadow: 0 0 9px #999;
    margin-bottom: 10px;
    position: relative;
    img {
      width: 100%;
      height: 300px;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      position: absolute;
      z-index: 2;
      bottom: 0;
      color: cornsilk;
      text-align: left;
	  max-height: 84px;
      h3 {
        font-size: 16px;
      }
      .info-body {
        font-size: 12px;
      }
    }
  }
}
</style>