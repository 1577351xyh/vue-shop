<template>
    <div>
        <commens :id=id></commens>
    </div>
</template>

<script>
import commens from '../comment/Comment.vue'
export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
    components:{
        commens
    }
}
</script>