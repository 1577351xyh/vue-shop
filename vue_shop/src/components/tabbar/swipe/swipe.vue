<template>
    <div>
        <mt-swipe :auto="4000">
      <!-- 在组件中使用v-for一定要使用key -->
      <mt-swipe-item v-for="item in listArr" :key="item">
        <img :src="item" alt />
      </mt-swipe-item>
    </mt-swipe>
    </div>
</template>
<script>
export default {
    props:['listArr']
}
</script>
<style  scoped lang="scss">
    .mint-swipe {
  height: 234px;
  .mint-swipe-item {
 
    img {
      width: 100%;
    }
  }
}
</style>