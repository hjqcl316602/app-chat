<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  // require('recorder');
  import { ImagePreview } from 'vant';
  import msg  from '../vue.mixins/msg'
  import resource  from '../vue.mixins/resource'
  export default {
    name: "chat",
    components: {},
    mixins: [ msg , resource ],
    data() {
      return {
        params:{
          msg:'',
          msgType:'1',  // 1 - 文本 2 - 图片  3 - 视频 4 - 语音
          isOther:false,
          receiverId:'',
          friendName:''
        },
        recorder:null,
        audio_context:null,
        timer:null
      }

    },
    mounted() {
      this._init_page();
    },
    activated() {

    },
    methods: {
      async _init_page() {
        this.params.receiverId = this.$route.query['friendId'];
        this.params.friendName = this.$route.query['friendName'];
        if( this.params.friendName ){
          document.title = this.params.friendName
        }

        this._set_interval()

      },

      _set_interval(){
        this.$get_msg_detail({ msgType : 1 , senderId:this.params.receiverId  }).then(()=>{
          setTimeout(()=>{ Doms.setScrollToBottom( )},30 )
        });

        this.timer = setInterval(()=>{
          this.$get_msg_detail({ msgType : 1 , senderId:this.params.receiverId  }).then(()=>{
            setTimeout(()=>{ Doms.setScrollToBottom( )},30 )
          });
        },5 * 1000 )
      },
      _clear_interval(){
        clearInterval(this.timer)
      },


      _send_msg(){
        if(!this.params.msg){
          this.$toast('请输入您想说的话...')
        }else{
          let obj = {
            contentType:1,    // 1文本  2图片 3 视频 4 语音
            receiverId:this.params.receiverId,
            content:this.params.msg
          }
          this.$send_single_msg(obj).then(()=>{
            this.$toast('发送消息成功！');

            //this.$get_msg_detail({ msgType : 1 , senderId:this.params.receiverId  })
            let obj = {
              contentType:1,
              type : 1,
              photo:this.userMessage['photo'],
              content:this.params.msg
            }
            this.params.msg = '';
            this.msgDetail.list.push(obj);
            setTimeout(()=>{ Doms.setScrollToBottom( )},30 )
          })
        }

      },
      // 选择图片
      _select_image(e){
        this.params.isOther = false ;
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('file',file);

        this.$upload_file(1,formData).then((res)=>{
          e.target.value = '' ;
          let obj = {
            contentType:2,    // 1文本  2图片 3 视频 4 语音
            receiverId:this.params.receiverId,
            content:res,
            smallPic:res,
            type : 1,
            photo:this.userMessage['photo'],
          };
          this.$send_single_msg(obj).then(()=>{
            this.$toast('发送图片成功！');
            this.msgDetail.list.push(obj);
            setTimeout(()=>{ Doms.setScrollToBottom( )},30 )
          })
        })

      },
      // 选择视频
      _select_video(e){
        this.params.isOther = false ;
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('file',file);
        this.$upload_file(2,formData).then((res)=>{
          e.target.value = '' ;
          let obj = {
            contentType:3,    // 1文本  2图片 3 视频 4 语音
            receiverId:this.params.receiverId,
            content:res,
            type : 1,
            photo:this.userMessage['photo'],
          };
          this.$send_single_msg(obj).then(()=>{
            this.$toast('发送视频成功！');
            this.msgDetail.list.push(obj);
            setTimeout(()=>{ Doms.setScrollToBottom( )},30 )
          })

        })
      },
      //选择语音
      _select_audio(e){
        this.params.isOther = false ;
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('file',file);
        this.$upload_file(3,formData).then((res)=>{
          e.target.value = '' ;

          let obj = {
            contentType:4,    // 1文本  2图片 3 视频 4 语音
            receiverId:this.params.receiverId,
            content:res,
            type : 1,
            photo:this.userMessage['photo'],
          };
          this.$send_single_msg(obj).then(()=>{
            this.$toast('发送语音成功！');
            this.msgDetail.list.push(obj);
            setTimeout(()=>{ Doms.setScrollToBottom( )},30 )
          })
        })

      },
      //预览图片
      _show_picture(pic){
        let pics=[];
        this.msgDetail.list.forEach((item,i)=>{
          if(item['contentType'] == 2){
            pics.unshift(item['content'])
          }
        });
        let index = pics.indexOf(pic);
        ImagePreview({
          images: pics,
          startPosition: index,

        });
      },
      _input_focus(){

        this._clear_interval()

      },
      _input_blur(){
        this._set_interval()

      }




    },
    beforeDestroy(){
      this._clear_interval()
    },
    watch: {
      'params.msg': {
        handler(val, olval) {
          if(val){
            this.params.isOther = false
          }
        },
        deep: true, immediate: true
      }
    },
  }
</script>
<template>
  <div class="vc-fluid--h-min " style="padding-bottom: 100px;">

    <div class="vc-padding__lg--ad vc-flow--hn  ">
      <div class="vc-margin__lg--ud  " v-for="(item,index) in msgDetail.list"  >


        <div class="vc-flex vc-content--end " v-if="item['type'] == 1 "  >

          <div class=" vp-img__inner vp-img__circle" data-round="35">
          </div>
          <div class="vc-flex--fit vc-margin--rt vc-text--right">
            <template v-if="item['contentType'] ==1  ">
              <div class=" vc-padding vp-bg vc-margin--tp vp-radius" style="display: inline-block" >
                <span class="vc-text--baseline--md  " >{{ item['content']}}</span>
              </div>
            </template>

            <template v-else-if="item['contentType'] == 2">

              <div class="vc-margin--tp">
                <div class="vp-img__self" style="max-width: 50%" @click="_show_picture(item['content'])">
                 <!-- <img src="" alt="">-->
                  <img :src="item['smallPic']" alt="" class="" >
                  <img src="../vue.images/image-normal.png" alt="" class="vp-img--error" style="max-width: 50%" >
                </div>
              </div>

            </template>

            <template v-else-if="item['contentType'] == 3">
              <div class="vc-margin--tp">
                <video :src="item['content']" controls="controls" style="width: 50%">
                  您的浏览器不支持 video 标签。
                </video>
              </div>
            </template>

            <template v-else-if="item['contentType'] == 4">

              <div class="vc-margin--tp">
                <audio controls="">
                  <source :src="item['content']">
                </audio>
              </div>

            </template>

          </div>
          <div class=" vp-img__inner vp-img__circle" data-round="35">
            <img :src="item['photo']" alt="" class="vp-img--cover">
            <img src="../vue.images/icon-head-error.png" alt="" class="vp-img--error">
          </div>

        </div>


        <div class="vc-flex " v-else  >
          <div class=" vp-img__inner vp-img__circle" data-round="35">
            <img :src="item['senderPhoto']" alt="" class="vp-img--cover">
            <img src="../vue.images/icon-head-error.png" alt="" class="vp-img--error">
          </div>


          <div class="vc-flex--fit vc-margin--lt vc-text--left">
            <template v-if="item['contentType'] ==1  ">
              <div class=" vc-padding vp-bg vc-margin--tp vp-radius" style="display: inline-block" >
                <span class="vc-text--baseline--md  " >{{ item['content']}}</span>
              </div>
            </template>

            <template v-else-if="item['contentType'] == 2">

              <div class="vc-margin--tp">
                <div class="vp-img__self" style="max-width: 50%" @click="_show_picture(item['content'])">
                  <!-- <img src="" alt="">-->
                  <img :src="item['smallPic']" alt="" class="" >
                  <img src="../vue.images/image-normal.png" alt="" class="vp-img--error" style="max-width: 50%" >
                </div>
              </div>

            </template>

            <template v-else-if="item['contentType'] == 3">
              <div class="vc-margin--tp">
                <video :src="item['content']" controls="controls" style="width: 50%">
                  您的浏览器不支持 video 标签。
                </video>

              </div>
            </template>

            <template v-else-if="item['contentType'] == 4">

              <div class="vc-margin--tp">

                <audio controls="">
                  <source :src="item['content']">
                </audio>
              </div>

            </template>

          </div>
          <div class=" vp-img__inner vp-img__circle" data-round="35">
          </div>

        </div>

      </div>
    </div>

    <div class="vp-footer vp-footer--shadow vp-bg">
      <div class="vc-flex vc-items--center   vc-padding__lg" >

        <template v-if="true">

          <div class="vc-flex--fit">
            <van-field
              v-model="params.msg"
              type="textarea"
              placeholder="请输入您想说的话..."
              rows="1"
              :autosize="{ maxHeight:100 }"
              class="vc-text--lg"
              clearable
              @focus = '_input_focus'
              @blur = '_input_blur'
            />
          </div>

          <template v-if="!params.msg">
            <div >
              <i class="iconfont icon-jia1 vc-text--theme" style="font-size: 26px" v-if="!params.isOther" @click="params.isOther = true"></i>
              <i class="iconfont icon-msnui-sub vc-text--theme" style="font-size: 26px" v-else @click="params.isOther = false"></i>
            </div>
          </template>

          <template v-else>
            <div class="vc-padding--lt"><span class="vc-text--theme vc-text--bold" @click="_send_msg">发送</span></div>
          </template>

        </template>

      </div>

      <div class="vc-padding__lg vc-border--tp " v-if="params.isOther">

        <template v-if="params.msgType != 3 ">
          <div class="vc-flex">
            <!--视频-->
            <label class="vp-file vc-margin__lg--rt" >
              <i class="iconfont icon-shipin vc-text--theme" style="font-size: 50px"></i>
              <input type="file" accept="video/*"  multiple  name="file-img" @change="_select_video">
            </label>
            <!--语音-->
            <label class="vp-file vc-margin__lg--rt" >
              <i class="iconfont icon-huatong vc-text--theme" style="font-size: 50px"></i>
              <input type="file" accept="audio/*"  multiple  name="file-img" @change="_select_audio">
            </label>

            <!--图片-->
            <label class="vp-file vc-margin__lg--rt" >
              <i class="iconfont icon-morentu vc-text--theme" style="font-size: 50px"></i>
              <input type="file" accept="image/*"  multiple  name="file-img" @change="_select_image">
            </label>


          </div>
        </template>


      </div>
    </div>
  </div>
</template>
<style scoped>
  audio{ width: 100% ;  }
</style>
