<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import group  from '../vue.mixins/group'
  export default {
    name: "ChatGroup",
    components: {},
    mixins: [ group ],
    data() {
      return {}
    },
    mounted() {
      this._init_page();
    },
    activated() {

    },
    methods: {
      async _init_page() {
        this.$get_group_list()
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
<div>

  <template v-if="group.list.length > 0 ">
    <div class="vp-bg">

      <div class=" vc-border--bm " v-for="(item,index) in group.list">
        <router-link tag="div" :to="{ name :'ChatGroupRoom',query:{ groupId : item['groupId'] ,groupName:item['groupName']}}">
          <van-swipe-cell :right-width="100">
            <div class="vc-padding__lg">
              <div class="vc-flex vc-flex--between-center">
                <div class="vc-flex vc-items--center">
                  <div class="vp-img__inner vp-img__circle" data-round="35">
                    <img  :src="item['groupPhoto']" alt="" class="vp-img--cover">
                    <img src="../vue.images/icon-head-error.png" alt="" class="vp-img--error">
                  </div>
                  <div class="vc-margin--lt">
                    <span class="vc-text--bold ">{{ item['groupName']}}</span>
                  </div>
                </div>
              </div>
            </div>

            <div slot="right" style="width: 100px;height:100%;">
              <router-link :to="{ name : 'ChatGroupDetail',query:{ groupId : item['groupId'] }}"  class="vp-btn__normal vp-btn--theme" >编辑</router-link>
            </div>
          </van-swipe-cell>

        </router-link>


      </div>
    </div>
  </template>


  <template v-else>

    <div class="vc-fluid vc-flex--center vc-padding__lg">
      <div class="vc-text--center">
        <span class="vc-text--light">暂无群聊，去创建吧~~</span>
      </div>
    </div>

  </template>


  <div class="vp-footer vp-footer--shadow">
    <div class="vp-row">

      <router-link class="vp-btn__normal vp-btn--theme" tag="div" :to="{ name :'RelationGroup'}">
        发起群聊
      </router-link>

    </div>
  </div>
</div>
</template>
<style scoped></style>
