<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import mem  from '../vue.mixins/mem'
  import  NavBar from './component/NavBar'
  export default {
    name: "UserRelation",
    components: { NavBar },
    mixins: [ mem ],
    data() {
      return {}
    },
    mounted() {
      this._init_page();
    },
    activated() {

    },
    methods: {
      async _init_page(){
        this.$get_user_relation()
      },

      _delete_friend(item){
        this.$dialog.confirm({
          title:'确认信息',
          message:`是否确认删除好友【 ${item['nickName'] }】?`
        }).then(()=>{
          this.$remove_friend({ friendId:item['friendId']}).then(()=>{
            this.$toast(`好友【${item.nickName}】已移除！`)
          })
        }).catch(()=>{
          this.$toast(`您已取消移除好友【${item.nickName}】！`)
        })

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
  <div >



    <div class="vc-fluid--h-min  vc-padding__xl-x--bm">

      <div class="vp-bg vc-margin__lg--bm">

        <div class="vc-padding__lg vc-border--bm">
          <router-link tag="div" :to="{ name :'Invite'}">
            <div class="vc-flex vc-flex--between-center">
              <div class="vc-flex vc-items--center">
                <div class="vp-img__inner vp-img__icon vp-bg--theme vc-flex--center" data-round="35">
                  <i class="iconfont icon-haoyou vc-text--white " style="font-size: 24px"></i>
                </div>
                <div class="vc-margin--lt">
                  <span class="vc-text--bold ">添加好友</span>
                </div>
              </div>
              <div>
                <i class="iconfont icon-arrow vc-text--gray"></i>
              </div>
            </div>
          </router-link>

        </div>
        <div class="vc-padding__lg vc-border--bm">
          <router-link tag="div" :to="{ name :'ChatGroup'}">
            <div class="vc-flex vc-flex--between-center">
              <div class="vc-flex vc-items--center">
                <div class="vp-img__inner vp-img__icon vp-bg--assist vc-flex--center" data-round="35">
                  <i class="iconfont icon-qun vc-text--white " style="font-size: 24px"></i>
                </div>
                <div class="vc-margin--lt">
                  <span class="vc-text--bold ">群聊</span>
                </div>
              </div>
              <div>
                <i class="iconfont icon-arrow vc-text--gray"></i>
              </div>
            </div>
          </router-link>

        </div>

      </div>


      <template v-if="friend.list.length > 0 ">
        <div class="vp-bg vc-border--bm">
          <router-link tag="div" :to="{ name : 'Chat' ,query :{ friendId : item['friendId'] ,friendName : item['nickName'] } }" v-for="(item,index) in  friend.list" :key="index">
            <van-swipe-cell :right-width="100" >
              <div class="vc-padding__lg--ad vc-padding__md-lg--ud vc-border--tp   " >
                <div class="vc-flex vc-flex--between-center">
                  <div class="vc-flex vc-items--center">
                    <div class="vp-img__inner vp-img__circle" data-round="35">
                      <img :src="item['photo']" alt="" class="vp-img--cover">
                      <img src="../vue.images/icon-head-error.png" alt="" class="vp-img--error">
                    </div>
                    <div class="vc-margin--lt">
                      <span class="vc-text--bold"> {{ item['nickName'] }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div slot="right" style="width: 100px;height:100%;">
                <div class="vp-btn__normal vp-btn--danger" @click="_delete_friend(item)">移除</div>
              </div>
            </van-swipe-cell>

          </router-link>
        </div>

      </template>
      <template v-else>
        <div class="vc-text--center">
          <span class="vc-text--light">暂无好友，去添加吧~~</span>
        </div>
      </template>


    </div>



    <NavBar active="Relation"></NavBar>

    <!--<div class="vp-footer vp-footer&#45;&#45;shadow">
      <div class="vp-row">

        <router-link class="vp-btn__normal vp-btn&#45;&#45;theme" tag="div" :to="{ name :'Relation'}">
          创建聊天室
        </router-link>

      </div>
    </div>-->
  </div>
</template>
<style scoped></style>
