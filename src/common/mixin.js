import {debounce} from 'common/utils'

export const itemListenerMixin = {
  data() {
    return{
      itemImgListener: null
    }
  },
  mounted() {
    // 图片加载完成事件监听，刷新scroll的可滚动高度，优化用户体验(防抖)
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    // 监听事件总线发送来的事件并保存
    this.itemImgListener = this.$bus.$on('itemImageLoad', () => {
    // 调用scroll的refresh刷新可滚动高度
    refresh()
    })
  }
}