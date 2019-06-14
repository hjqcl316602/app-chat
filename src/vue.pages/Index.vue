<script>
  import  NavBar from './component/NavBar'
  import msg  from '../vue.mixins/msg'
  export default {
    components:{ NavBar },
    name: 'Index',
    mixins:[ msg ],
    data() {
      return {
        timer:null
      }
    },
    mounted(){
      this._init_page();
    },
    beforeDestroy(){
      clearInterval(this.timer) ;
    },
    methods:{
      async _init_page(){
        this.$get_msg_list()
        this.timer = setInterval(()=>{
          this.$get_msg_list()
        },10 * 1000 )

      }
    }
  }
</script>

<template>
  <div class="   ">

    <template v-if="msg.list.length > 0 ">

      <div class="vc-fluid--h-min  vc-padding__xl-x--bm">
        <div class="vc-margin--bm">
          <router-link tag="div" :to="{ name : 'Chat',query:{ friendId : item['senderId'] ,friendName : item['senderNickName'] }}" v-for="(item,index) in msg.list" :key="index" v-if="item['msgType'] == 1">
            <div class="vc-padding__lg vc-border--tp vp-bg "   >
              <div class="vc-flex vc-items--center">
                <div class="vp-img__inner vp-img__circle" data-round="35">
                  <img :src="item['senderPhoto']" alt="" class="vp-img--cover">
                  <img src="../vue.images/icon-head-error.png" alt="" class="vp-img--error">
                </div>
                <div class="vc-margin--lt vc-flex--fit">
                  <span class="vc-text--bold">{{ item['senderNickName']}}</span>
                  <div class="vc-margin--tp">
                    <template v-if="item['contentType'] == 1">
                      <div class="vc-text--baseline vc-text--clamp">{{ item['content'] }}</div>
                    </template>
                    <template v-if="item['contentType'] == 2">
                      <div class="">[ 图片 ]</div>
                    </template>
                    <template v-if="item['contentType'] == 3">
                      <div class="">[ 视频 ]</div>
                    </template>
                    <template v-if="item['contentType'] == 4">
                      <div class="">[ 语音 ]</div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div class="vc-margin--bm">
          <router-link tag="div" :to="{ name : 'ChatGroupRoom',query:{ groupId : item['groupId'] ,groupName : item['groupName'] }}" v-for="(item,index) in msg.list" :key="index" v-if="item['msgType'] == 2">
            <div class="vc-padding__lg vc-border--tp vp-bg "   >
              <div class="vc-flex vc-items--center">
                <div class="vp-img__inner vp-img__circle" data-round="35">
                  <img :src="item['groupPhoto']" alt="" class="vp-img--cover">
                  <img src="../vue.images/icon-head-error.png" alt="" class="vp-img--error">
                </div>
                <div class="vc-margin--lt vc-flex--fit">
                  <span class="vc-text--bold">{{ item['groupName']}}</span>
                  <div class="vc-margin--tp">
                    <template v-if="item['contentType'] == 1">
                      <div class="vc-text--baseline vc-text--clamp">{{ item['content'] }}</div>
                    </template>
                    <template v-if="item['contentType'] == 2">
                      <div class="">[ 图片 ]</div>
                    </template>
                    <template v-if="item['contentType'] == 3">
                      <div class="">[ 视频 ]</div>
                    </template>
                    <template v-if="item['contentType'] == 4">
                      <div class="">[ 语音 ]</div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>

      </div>

    </template>

    <template v-else>
      <div class="vc-fluid vc-flex--center ">
        <div class=""><span class="vc-text--light">暂无新消息~~</span> </div>
      </div>
    </template>



    <NavBar active="Index"></NavBar>

    <!--<div class="vp-footer vp-footer&#45;&#45;shadow">
      <div class="vp-row">
        <router-link class="vp-btn__normal vp-btn&#45;&#45;theme" tag="div" :to="{ name :'Relation'}">
           通讯录
        </router-link>

      </div>
    </div>-->
  </div>
</template>

<style   scoped>
</style>
