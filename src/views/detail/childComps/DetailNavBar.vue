<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="detailBackClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" class="title-item" :class="{active: index === currtentIndex}" @click="detailTitleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data () {
      return {
        titles: ['商品','参数','评论','推荐'],
        currtentIndex: 0
      }
    },
    methods: {
      detailTitleClick(index) {
        this.currtentIndex = index
      },
      detailBackClick() {
        this.$router.go(-1)
      }
    }
}
</script>
<style scoped>
  .title {
    display: flex;
    font-size: 15px;
  }
  .title-item {
    flex: 1;

  }
  .active {
    color: var(--color-high-text);
  }
.back img{
    margin-top: 11PX;
  }
</style>