<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  
  export default {
    name: 'BackTop',
    components: {
    
    },
    data() {
      return {
        
      };
    },
    //监听属性 类似于data概念
    computed: {
      
    },
    //方法集合
    methods: {

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
      
    },
    }
</script>
<style scoped>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
    z-index: 9;
  }
  .back-top img {
    height: 43px;
    width: 43px;
  }
</style>