<template>
<!-- 组件的总盒子 -->
  <div class="app_con">
    <!-- 这是头部 -->
    <mt-header fixed title="vue商城项目" class="header"></mt-header>
    <!-- 这是中间 -->
    <transition mode="">
    <router-view></router-view>
    </transition>

    <!-- 这是尾部 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item_ab" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item_ab" to="/menber">
        <span class="mui-icon mui-icon-contact">
        </span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item_ab" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="nums">{{this.$store.getters.getmax}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item_ab" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
</script>


<style lang="scss" scoped>
.header{
  z-index: 99;
}
.app_con {
  //横向方向隐藏
  overflow-x: hidden;
  padding-top: 40px;
  padding-bottom: 50px;
}
//进来之前
.v-enter{
  opacity: 0;
  transform: translateX(100%);
}
//离开之前
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active{
  transition: all 0.5s ease; 
}
.mui-bar-tab .mui-tab-item_ab.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item_ab.mui-active[data-v-7ba5bd90] {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item_ab {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item_ab[data-v-7ba5bd90] {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item_ab .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item_ab .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item_ab {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
</style>
