<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import group  from '../vue.mixins/group'
  export default {
    name: "ChatGroupDetail",
    components: {},
    mixins: [ group ],
    data() {
      return {
        params:{
          groupId:'',
          detail:{}
        }
      }
    },
    mounted() {
      this._init_page();
    },
    activated() {

    },
    methods: {
      async _init_page() {
        this.params.groupId = this.$route.query['groupId'];
        this.$get_group_detail(this.params).then((res)=>{
          this.params.detail = res['data']
        })
      },
      _del_friend(friendId,item){

        let msg = [ '删除成员','解散群','退出群'];
        let noticeMessage = '';
        let successMessage = '';
        let index  =  0 ;
        let params = {
          groupId : this.params.groupId,
          friendId:this.userMessage['memId']
        };

        if(this.params.detail['removeFlag'] ){
          if(  friendId != this.userMessage['memId']){
            index = 0 ;
            noticeMessage = `是否确认删除群成员【${item['nickName']}】`;
            successMessage = `成功删除群成员【${item['nickName']}】` ;
            params.friendId = friendId;
          }else{
            index = 1 ;
            noticeMessage = `是否确认解散群【${ this.params.detail['groupName'] }】`;
            successMessage = `成功解散群【${ this.params.detail['groupName'] }】`;
          }
        }else{
          index = 2 ;
          noticeMessage = `是否确认退出群【${ this.params.detail['groupName'] }】`;
          successMessage = `成功退出群【${ this.params.detail['groupName'] }】`;
        }





        this.$dialog.confirm({
          title:'确认信息',
          message:noticeMessage
        }).then(()=>{
          this.$del_mem(params).then(()=>{
            this.$toast(successMessage);
            if(index != 0 ){
              this.$router.go(-1)
            }else{
              this._init_page();
            }

          })
        })
      },
      _add_mems(){
        let friends = this.params.detail.list || [];
        let newFriends = [];
        friends.forEach((item,i)=>{
          newFriends.push(item['friendId'])
        })
        this.$router.push({ name : 'RelationGroup' ,query :{ friends : newFriends.join(',') , groupId : this.params.groupId ,type : 'update' } })
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
 <div class="vc-fluid--h-min vp-bg">

   <div class="vc-padding__lg vc-border--bm">
     <div class="vc-flex--between-center">
       <span class="vc-text--bold">{{ params.detail.groupName }}</span>
       <router-link tag="div" :to="{ name : 'ChatGroupUpdate',query:{ groupName : params.detail.groupName,groupId :  params.groupId } }">
         <div class="vc-margin--rt vc-text--theme vc-text--bold">修改</div>
       </router-link>

     </div>
   </div>

   <div class="vc-padding__lg vc-border--bm" v-if="params.detail.list && params.detail.list.length > 0 ">
     <div class="vc-row" data-gutter="20">
       <div class="vc-col--06" v-for="(item,index) in params.detail.list">
         <div class="vp-ratio">
           <div class="vp-ratio__outer" data-ratio="1:1">
             <div class="vp-ratio__inner vp-img__inner vp-img__close">
               <div class="vp-img__closed" @click="_del_friend(item['friendId'],item )" v-if="params.detail['removeFlag']">
                 <i class="iconfont icon-quxiao vc-text--xl vc-text--danger"></i>
               </div>
               <img :src="item['photo']" alt="" class="vp-img--cover">
             </div>
           </div>
         </div>
         <div>
           <p class="vc-text--light vc-text--ellipsis vc-text--baseline--lg">{{ item['nickName'] }} </p>
         </div>
       </div>

       <div class="vc-col--06"  >
         <div class="vp-ratio">
           <div class="vp-ratio__outer" data-ratio="1:1">
             <div class="vp-ratio__inner vp-img__inner  " @click="_add_mems">
              <svg viewBox="0 0 1024 1024" version="1.1" p-id="1903" height="100%" width="100%" fill="#666">
                <path d="M0.002 707.763 10.04 707.763l0 40.16L0.002 747.923 0.002 707.763zM0.002 767.998 10.04 767.998l0 40.155L0.002 808.153 0.002 767.998zM0.002 888.473 10.04 888.473l0 40.15L0.002 928.623 0.002 888.473zM0.002 466.824 10.04 466.824l0 40.155L0.002 506.979 0.002 466.824zM0.002 828.248 10.04 828.248l0 40.145L0.002 868.393 0.002 828.248zM0.002 527.059 10.04 527.059l0 40.16L0.002 567.219 0.002 527.059zM0.002 587.294 10.04 587.294l0 40.16L0.002 627.454 0.002 587.294zM0.002 647.528 10.04 647.528l0 40.155L0.002 687.683 0.002 647.528zM55.215 1013.962l40.16 0 0 10.035-40.16 0L55.215 1013.962zM115.455 1013.962l40.155 0 0 10.035-40.155 0L115.455 1013.962zM125.49 0l40.155 0 0 10.037L125.49 10.037 125.49 0zM0.002 948.708 10.04 948.708l0 40.16L0.002 988.868 0.002 948.708zM175.692 1013.962l40.152 0 0 10.035-40.152 0L175.692 1013.962zM0.002 25.097 10.04 25.097l0-15.06 35.14 0L45.18 0 0 0 0.002 25.097zM0.002 406.591 10.04 406.591l0 40.155L0.002 446.746 0.002 406.591zM65.257 0l40.155 0 0 10.037L65.257 10.037 65.257 0zM0.002 45.177 10.04 45.177 10.04 85.33 0.002 85.33 0.002 45.177zM426.671 0l40.155 0 0 10.037-40.155 0L426.671 0zM547.134 0l40.16 0 0 10.037-40.16 0L547.134 0zM486.909 0l40.155 0 0 10.037-40.155 0L486.909 0zM366.437 0l40.155 0 0 10.037-40.155 0L366.437 0zM607.378 0l40.15 0 0 10.037-40.15 0L607.378 0zM727.848 0l40.15 0 0 10.037-40.15 0L727.848 0zM667.613 0l40.15 0 0 10.037-40.15 0L667.613 0zM306.194 0l40.157 0 0 10.037-40.157 0L306.194 0zM0.002 105.412 10.04 105.412l0 40.155L0.002 145.567 0.002 105.412zM0.002 225.882 10.04 225.882l0 40.155L0.002 266.037 0.002 225.882zM0.002 165.645 10.04 165.645l0 40.157L0.002 205.802 0.002 165.645zM245.957 0l40.162 0 0 10.037-40.162 0L245.957 0zM0.002 286.117 10.04 286.117l0 40.152L0.002 326.269 0.002 286.117zM0.002 346.352 10.04 346.352l0 40.16L0.002 386.512 0.002 346.352zM185.73 0l40.155 0 0 10.037L185.73 10.037 185.73 0zM235.924 1013.962l40.155 0 0 10.035-40.155 0L235.924 1013.962zM10.04 1008.952 0 1008.952l0 15.045 35.135 0 0-10.035L10.037 1013.962 10.04 1008.952zM1013.962 617.403l10.035 0 0 40.165-10.035 0L1013.962 617.403zM1013.962 737.888l10.035 0 0 40.145-10.035 0L1013.962 737.888zM1013.962 677.648l10.035 0 0 40.155-10.035 0L1013.962 677.648zM1013.962 496.941l10.035 0 0 40.162-10.035 0L1013.962 496.941 1013.962 496.941zM1013.962 557.184l10.035 0 0 40.15-10.035 0L1013.962 557.184zM296.159 1013.962l40.157 0 0 10.035-40.157 0L296.159 1013.962zM1013.962 798.118l10.035 0 0 40.16-10.035 0L1013.962 798.118zM1013.962 858.358l10.035 0 0 40.15-10.035 0L1013.962 858.358zM1013.962 135.53l10.035 0 0 40.157-10.035 0L1013.962 135.53zM1013.962 195.767l10.035 0 0 40.152-10.035 0L1013.962 195.767zM1013.962 75.297l10.035 0 0 40.152-10.035 0L1013.962 75.297zM1013.962 978.833l10.035 0 0 40.145-10.035 0L1013.962 978.833zM1013.962 436.706l10.035 0 0 40.155-10.035 0L1013.962 436.706zM1013.962 15.055l10.035 0 0 40.157-10.035 0L1013.962 15.055zM1013.962 376.469l10.035 0 0 40.157-10.035 0L1013.962 376.469zM1013.962 316.234l10.035 0 0 40.16-10.035 0L1013.962 316.234zM1013.962 255.999l10.035 0 0 40.157-10.035 0L1013.962 255.999zM1013.962 918.593l10.035 0 0 40.155-10.035 0L1013.962 918.593zM597.333 1013.962l40.16 0 0 10.035-40.16 0L597.333 1013.962zM537.104 1013.962l40.15 0 0 10.035-40.15 0L537.104 1013.962zM778.033 1013.962l40.16 0 0 10.035-40.16 0L778.033 1013.962zM717.808 1013.962l40.165 0 0 10.035-40.165 0L717.808 1013.962zM657.573 1013.962l40.155 0 0 10.035-40.155 0L657.573 1013.962zM476.866 1013.962l40.152 0 0 10.035-40.152 0L476.866 1013.962zM356.399 1013.962l40.152 0 0 10.035-40.152 0L356.399 1013.962zM416.629 1013.962l40.152 0 0 10.035-40.152 0L416.629 1013.962zM958.753 1013.962l40.155 0 0 10.035-40.155 0L958.753 1013.962zM848.313 0l40.16 0 0 10.037-40.16 0L848.313 0zM908.553 0l40.155 0 0 10.037-40.155 0L908.553 0zM968.788 0l40.165 0 0 10.037-40.165 0L968.788 0zM898.508 1013.962l40.155 0 0 10.035-40.155 0L898.508 1013.962zM788.078 0l40.17 0 0 10.037-40.17 0L788.078 0zM838.278 1013.962l40.155 0 0 10.035-40.155 0L838.278 1013.962zM522.039 210.822l-20.075 0 0 291.142L210.824 501.964l0 20.075 291.139 0 0 291.139 20.075 0L522.038 522.039l301.179 0 0-20.075L522.039 501.964 522.039 210.822z" p-id="6051"></path>
              </svg>
             </div>
           </div>
         </div>

       </div>
     </div>
   </div>


   <div class="">

   </div>

   <div class="vp-footer vp-footer--shadow">
     <div class="vp-row">
       <div class="vp-btn__normal vp-btn--danger" v-if="params.detail['removeFlag']" @click="_del_friend(userMessage['memId'])">解散群</div>
       <div class="vp-btn__normal vp-btn--danger" v-if="!params.detail['removeFlag']" @click="_del_friend(userMessage['memId'])">退出群</div>
     </div>
   </div>

 </div>
</template>
<style scoped></style>
