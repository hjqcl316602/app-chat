<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import mem  from '../vue.mixins/mem'
  import group  from '../vue.mixins/group'
  import  NavBar from './component/NavBar'
  export default {
    name: "RelationGroup",
    components: { NavBar },
    mixins: [ mem , group ],
    data() {
      return {
        params:{
          selectedFriends:[],
          friends:[],
          groupId:'',
          type:'insert'
        }
      }
    },
    computed:{
      friendList(){
        let newFriendList = [];
        let friendList = this.friend.list.slice(0);
        friendList.forEach((item,i)=>{
           let index = this.params.selectedFriends.findIndex((friendId)=>{ return friendId == item['friendId'] });
           console.log(index)
          if(index === -1 ){
            let obj = {} ;
            if(this.params.friends.indexOf( item['friendId'] ) === -1){
              obj = Object.assign({ selected : false } , item)
            }else{
              obj = Object.assign({ selected : true } , item)
            }
            newFriendList.push(obj)
          }
        })
        return newFriendList;
      }
    },
    mounted() {
      this._init_page();
    },
    activated() {

    },
    methods: {
      async _init_page(){
        await this.$get_user_relation();
        this.params.selectedFriends = this.$route.query['friends'] ? this.$route.query['friends'].split(',') : [];
        this.params.groupId = this.$route.query['groupId'] || '' ;
        this.params.type = this.$route.query['type'] || 'insert';
        console.log(this.params)
      },
      _create_chat(){
        if(this.params.friends.length == 0 ){
          this.$dialog.alert({
            message: '请选择您的好友！'
          })
        }else{
          this.$dialog.confirm({
            title:'确认信息',
            message:'是否确认创建群聊?'
          }).then(()=>{
            this.$create_chat({ friendIds: this.params.friends.join(',')}).then(()=>{
              setTimeout(()=>{
                this.$router.go(-1)
              },800)
            })
          }).catch(()=>{
            this.$toast( '您已取消创建群聊！' );
          })

        }
      },
      _add_group_mem(){
        if(this.params.friends.length == 0 ){
          this.$dialog.alert({
            message: '请选择您的好友！'
          })
        }else{
          this.$dialog.confirm({
            title:'确认信息',
            message:'是否确认添加新的群成员?'
          }).then(()=>{
            this.$add_group_mem({groupId:this.params.groupId, friendIds: this.params.friends.join(',')}).then(()=>{
              setTimeout(()=>{
                this.$router.go(-1)
              },800)
            })
          }).catch(()=>{
            this.$toast( '您已取消添加群成员！' );
          })

        }


      },


      _select_friend(item,index){

        let indexs = this.params.friends.indexOf(item['friendId'])
        if(indexs === -1){
          this.params.friends.push(item['friendId'])
        }else{
          this.params.friends.splice(indexs,1)
        }

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

    <template v-if="friendList.length  > 0 ">
      <div class="vc-fluid--h-min  vc-padding__xl-x--bm">
        <div  v-for="(item,index) in  friendList" :key="index" @click="_select_friend(item,index)">
          <div class="vc-padding__lg vc-border--tp  vp-bg" >
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
              <div>
                <i class="iconfont icon-gouxuan vc-text--gray" v-if="!item['selected']"></i>
                <i class="iconfont icon-gouxuan vc-text--theme" v-else></i>
              </div>
            </div>


          </div>
        </div>
      </div>

    </template>


    <template v-else>

      <div class="vc-fluid vc-flex--center ">
        <div class=""><span class="vc-text--light">暂无好友列表~~</span> </div>
      </div>

    </template>



    <!--<NavBar active="Relation"></NavBar>-->

    <div class="vp-footer vp-footer--shadow">
      <div class="vp-row">
        <div class="vp-btn__normal vp-btn--theme" @click="_create_chat" v-if="params.type == 'insert'">
          创建群聊
        </div>
        <div class="vp-btn__normal vp-btn--theme" @click="_add_group_mem" v-if="params.type == 'update'">
          添加成员
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
