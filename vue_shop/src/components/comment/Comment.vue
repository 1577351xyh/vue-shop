<template>
  <div class="content">
    <h3>发表评论</h3>
    <textarea placeholder="请输入要评论的内容(最多120个字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="getNewcon">发表</mt-button>
    <div class="cmt-list">
        <div class="cmt-item" v-for="(item , i) in commentList" :key="item.id">
            <div class="cmt-title">第{{1+i}}楼&nbsp;&nbsp; 用户:{{item.name}}&nbsp;&nbsp; 发表时间 : {{item.time}}</div>
            <div class="cmt-body">
                {{item.content}}
            </div>
        </div>
    </div>
    <mt-button class="mint-button mint-button--danger mint-button--large is-plain">加载更多</mt-button>
    <hr>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            commentList:[],
            msg:""            
        }
    },
    created() {
        this.getComment();
    },
    methods: {
        getComment(){
            this.$http.get("http://127.0.0.1:3747/home/comment").then(results=>{
                if(results.body.code ===200){
                    this.commentList = results.body.msg;
                    // console.log(this.commentList);
                }
            }) 
        },
        //发表评论
        /**
         * 参数1:id ($route.params.id)
         * 参数2:conten
         */
        getNewcon(){
            if(this.msg.length ===0){
                Toast("输入的内容不能为空");
                return;
            }
            console.log(this.$route.params.id);
            this.$http.post(`http://127.0.0.1:3747/home/comment/?id=${this.$route.params.id}&content=${this.msg}&time=${Date.now()}`).then(results=>{
                console.log(results.body);
                let obj = {
                    name:'匿名用户',
                    time: Date.now(),
                    content:this.msg
                }
                this.commentList.unshift(obj);
                this.msg = "";
            })
        }
    },
    props:["id"]
};
</script>



<style lang="scss" scoped>
.content{
    margin-top: 30px;
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0px;
    }
    .cmt-list{
        margin-top: 10px;
        .cmt-item{
            font-size: 12px;
            .cmt-title{
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }

}
</style>