<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  import  NavBar from './component/NavBar'
  export default {
    name: "User",
    components: { NavBar },
    mixins: [],
    data() {
      return {}
    },
    mounted() {
    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {

      }

    },
    watch: {
      '': {
        handler(val, olval) {

        },
        deep: true, immediate: true
      }
    },
  }
</script>
<template>
  <div class="vc-fluid--h-min ">

    <div class="vp-ratio">
      <div class="vp-ratio__outer" data-ratio="16:9">

        <router-link tag="div" :to="{ name :'UserMessage'}" class="vp-ratio__inner vp-bg--theme  vc-flex vc-flex--between-center vc-padding__lg">
          <div class="vc-flex vc-items--center">
            <div class="vp-img__inner vp-img__circle" data-round="80" >
              <img :src="userMessage['photo']" alt="" class="vp-img--min" @load="$img_load">
              <img src="../vue.images/icon-head-error.png" alt="" class="vp-img--error">
            </div>
            <div class="vc-margin--lt">
              <span class="vc-text--bold vc-text--white">{{ userMessage['nickName'] }}</span>
            </div>
          </div>
          <div>
            <i class="iconfont icon-iconfontjiantou2 vc-text--white"></i>
          </div>
        </router-link>

      </div>
    </div>

    <div class="vp-bg">
      <div class=" vc-padding__lg ">
        <router-link tag="div" :to="{ name : 'Invite'}">
          <div class="vc-flex--between-center">
            <div>
              <span class="vc-text--bold">邀请好友</span>
            </div>
            <div>
              <i class="iconfont icon-iconfontjiantou2"></i>
            </div>
          </div>
        </router-link>

      </div>
    </div>



    <NavBar active="User"></NavBar>
  </div>
</template>
<style scoped></style>
