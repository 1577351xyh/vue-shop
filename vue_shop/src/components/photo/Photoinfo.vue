<template>
    <div>
       <div class="content">
        <h3 class="newcon">{{pthoto.title}}</h3>
        <p class="newtitel">
            <span>发表时间:{{pthoto.time}}</span>
            <span>点击:{{pthoto.click}}次</span>
        </p>
        <hr>
        <!-- 内容 -->
        <div class="conhtml" v-html="pthoto.content"></div>
        <!-- 评论 -->
        <!-- 加载现成的组件 -->
        <commentbox :id="this.id"></commentbox>
    </div>
    </div>
</template>

<script>
import comment from "../comment/Comment.vue";
export default {
    data() {
        return {
            id:this.$route.params.id,
            pthoto:{}
        }
    },
    created() {
        this.getinfo();
    },
    methods: {
        
        getinfo(){
            console.log(this.id);
            this.$http.get("http://127.0.0.1:3747/photolist/info/?id=" + this.id).then(result=>{
                if(result.body.code ===200){
                    this.pthoto = result.body.msg[0];
                    console.log(this.pthoto);
                }
            })
        }  
    },
      components:{
        'commentbox' : comment
    }
}
</script>


<style lang="scss" scoped>
.content{
    padding: 0px 5px;
    .newcon{
    text-align: center;
    margin-top: 5px;
    font-size: 16px;
}
 .newtitel{
        color:blue;
        font-size:12px;
        display:flex;
        justify-content: space-between;
    }

}
</style>
