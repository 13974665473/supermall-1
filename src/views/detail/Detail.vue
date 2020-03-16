<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages = 'topImages'></detail-swiper>
      <detail-base-info :goods = 'goods'></detail-base-info>
      <detail-shop-info :shop = 'shop'></detail-shop-info>
      <detail-goods-info :detailInfo = 'detailInfo' @imgLoad = 'imgLoad' class="goodsinfo"></detail-goods-info>
      <detail-param-info :paramInfo = 'paramInfo'></detail-param-info>
      <detail-comment-info :commentInfo = 'commentInfo'></detail-comment-info>
      <goods-list :goods= 'recommends'></goods-list>
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

  import GoodsList from 'components/content/goods/GoodsList'

  import Scroll from 'components/common/scroll/Scroll'
  
  import {debounce} from 'common/utils'
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {itemListenerMixin} from 'common/mixin'
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
      DetailCommentInfo,
      GoodsList
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: []
      }
    },
    //监听属性 类似于data概念
    computed: {
      
    },
    //方法集合
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh()
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      // 保存传入的ID
      this.iid = this.$route.params.iid
      // 根据ID请求详情数据
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
      // 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    destroyed() {
      // 离开页面时取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    }
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
    position: absolute;
    top:44px;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .goods-info{
    position: relative;
  }
</style>