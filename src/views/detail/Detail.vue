<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages = 'topImages'></detail-swiper>
      <detail-base-info :goods = 'goods'></detail-base-info>
      <detail-shop-info :shop = 'shop'></detail-shop-info>
      <detail-goods-info :detailInfo = 'detailInfo' @imgLoad = 'imgLoad'></detail-goods-info>
      <detail-param-info :paramInfo = 'paramInfo'></detail-param-info>
      <detail-comment-info :commentInfo = 'commentInfo'></detail-comment-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {}
      }
    },
    //监听属性 类似于data概念
    computed: {
      
    },
    //方法集合
    methods: {
      imgLoad() {
        this.$refs.scroll.scrollTo(0, 0, 0)
        this.$refs.scroll.refresh()
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      // 保存传入的ID
      this.iid = this.$route.params.iid
      // 根据ID请求数据
      getDetail(this.iid).then(res => {
        // 获取顶部的轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 创建店铺信息
        this.shop = new Shop(data.shopInfo)
        // 获取商品详情信息
        this.detailInfo = data.detailInfo
        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
      
    },
    }
</script>
<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>