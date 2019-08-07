<template>
  <div>
    <div class="mui-numbox" data-numbox-min="0">
      <!-- "-"按钮，点击可减小当前数值 -->
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <input class="mui-numbox-input" value="1" type="number" @change="changeContent" ref="numbox" />
      <!-- "+"按钮，点击可增大当前数值 -->
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";

export default {
    data() {
        return {
            
        }
    }, 
    mounted() {
    mui(".mui-numbox").numbox();
  },
    
    methods: {
        changeContent(){
            this.$emit("getcount",parseInt(this.$refs.numbox.value));
        }
    },
}
</script>