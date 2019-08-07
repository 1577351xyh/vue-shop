<template>
    <div class="content">
        <h3 class="newcon">{{Obj.title}}</h3>
        <p class="newtitel">
            <span>发表时间:{{Obj.time}}</span>
            <span>点击: {{Obj.click}}次</span>
        </p>
        <hr>
        <!-- 内容 -->
        <div class="new_content" v-html="Obj.content"></div>
        <!-- 评论 -->
        <commentbox :id="this.id"></commentbox>
    </div>
</template>

<script>
//导入评论子组件
import comment from "../comment/Comment.vue";
export default {
    data(){
        return{
            id : this.$route.params.id,
            Obj:{}
        }
    },created() {
        this.getNewPa()
    },
    methods: {
        getNewPa(){
            this.$http.get(`http://127.0.0.1:3747/home/newsinfo?id=${this.id}`).then(results=>{
                if(results.body.code === 200){
                    this.Obj= results.body.msg;
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
