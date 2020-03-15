<template>
  <swiper class="detail-swiper">
    <swiper-item v-for = "item in topImages" >
      <a>
      <img :src="item" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  
  export default {
    name: 'DetailSwiper',
    props:{
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
    Swiper,
    SwiperItem
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
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>