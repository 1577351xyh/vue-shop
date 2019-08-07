<template>
  <div>
    <div class="mui-numbox" data-numbox-min="0">
      <!-- "-"按钮，点击可减小当前数值 -->
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <input
        class="mui-numbox-input"
        :value="inint"
        type="number"
        @change="changeContent"
        ref="numbox"
      />
      <!-- "+"按钮，点击可增大当前数值 -->
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {};
  },
  
  mounted() {
    mui(".mui-numbox").numbox();
  },

  methods: {
    changeContent() {
      //往数据资源中心传值
      //数据资源中心需要把当前id的num值替换成当前的value值
      console.log(this.goodid)
      console.log(this.$refs.numbox.value)
      this.$store.commit("updataGoodcar",{
        id:this.goodid,
        num:this.$refs.numbox.value
      })

    }
  },
  props: ["inint","goodid"],

};
</script>