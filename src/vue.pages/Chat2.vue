<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  // require('recorder');
  export default {
    name: "chat",
    components: {},
    mixins: [],
    data() {
      return {
        params:{
          msg:'',
          msgType:'1',  // 1 - 文本 2 - 图片 3 - 语音
          isOther:false,
          isRecording:false
        },
        recorder:null,
        audio_context:null
      }
    },
    mounted() {
      this._init_page();
    },
    activated() {

    },
    methods: {
      async _init_page() {
        this._recorder_init();
      },
      _recorder_init(){
        let _this = this ;
        window.onload = function init() {
          try {
            // webkit shim
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
            window.URL = window.URL || window.webkitURL;

            _this.audio_context = new AudioContext;
            console.log('Audio context set up.');
            console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
          } catch (e) {
            console.log('No web audio support in this browser!');
          }

          navigator.getUserMedia({audio: true}, function (stream) {
            let input = _this.audio_context.createMediaStreamSource(stream);
            console.log(input)
            _this.recorder = new Recorder(input);
            console.log(_this.recorder)
          }, function(e) {
            console.log('No live audio input: ' + e);
          });
        };
      },
      _start_user_media(stream){
        let input = this.audio_context.createMediaStreamSource(stream);
        console.log(input)
        this.recorder = new Recorder(input);
        console.log(this.recorder)
      },
      _send_msg(){
        this.params.msg = ''
      },
      _select_file(e){
        this.params.msgType = 2 ;
        this.params.isOther = false ;
      },
      _recorder_start(){
        this.recorder &&　this.recorder.record()
      },
      _recorder_stop(){
        this.recorder &&　this.recorder.stop();
        this.recorder && this.recorder.exportWAV(function(blob) {
          console.log(blob)
        })
      },
      _recorder_operate(type){
        this.params.isRecording = !this.params.isRecording;
        if(type == 'stop'){
          this.params.msgType = 1 ;
          this.params.isOther = false ;
        }
      }

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
      <div class="vc-margin__lg--ud  " v-for="(item,index) in 100"  >
        <div class="vc-flex  " v-if="index % 6 == 1 || index % 6 == 2  || index % 6 == 3 ">
          <div class=" vp-img__inner vp-img__circle" data-round="35">
            <img src="" alt="" class="vp-img--cover">
            <img src="../vue.images/icon-head-error.png" alt="" class="vp-img--cover">
          </div>

          <div class="vc-flex--fit vc-margin--lt">
            <template v-if="index % 5 == 2 ">
              <div class=" vc-padding vp-bg vc-margin--tp vp-radius" style="display: inline-block" >
                <span class="vc-text--baseline--md  " >们会定期 属性是在...</span>
              </div>
            </template>
            <template v-else-if="index % 5 == 3 ">
              <div class="vc-margin--tp">
                <audio controls="">
                  <source src="static/source/test.m4a">
                </audio>
              </div>

            </template>
            <template v-else>
              <img src="../vue.images/icon-head-error-male.png" alt="" class="" style="max-width: 50%">

            </template>

          </div>

          <div class=" vp-img__inner vp-img__circle" data-round="35">

          </div>

        </div>
        <div class="vc-flex vc-content--end " v-else >

          <div class=" vp-img__inner vp-img__circle" data-round="35">
          </div>
          <div class="vc-flex--fit vc-margin--rt vc-text--right">
            <template v-if="index % 6 == 4 ">
              <div class=" vc-padding vp-bg vc-margin--tp vp-radius" style="display: inline-block" >
                <span class="vc-text--baseline--md  " >们会定期 属性是在...</span>
              </div>
            </template>
            <template v-else-if="index % 6 == 5 ">
              <div class="vc-margin--tp">
                <audio controls="">
                  <source src="static/source/test.m4a">
                </audio>
              </div>

            </template>
            <template v-else>
              <img src="../vue.images/icon-head-error-male.png" alt="" class="" style="max-width: 50%">

            </template>

          </div>
          <div class=" vp-img__inner vp-img__circle" data-round="35">
            <img src="" alt="" class="vp-img--cover">
            <img src="../vue.images/icon-head-error.png" alt="" class="vp-img--cover">
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
            <label class="vp-file" >
              <i class="iconfont icon-morentu vc-text--light" style="font-size: 50px"></i>
              <input type="file" accept="image/*;capture = camera " name="file-img" @change="_select_file">
            </label>

            <div class="vc-margin__lg--lt" @click="params.msgType = 3 ">
              <i class="iconfont icon-huatong vc-text--xl-xx vc-text--light"  style="font-size: 50px"></i>
            </div>

          </div>
        </template>
        <template v-else>
          <div class="vc-padding">
            <div class="vp-btn__simple "
                 :class="{ 'vp-btn--theme':params.isRecording ,'vp-btn--normal':!params.isRecording}"
                 @mousedown.stop.prevent="_recorder_operate('start')"
                 @mouseup.stop.prevent="_recorder_operate('stop')"
                 @touchstart.stop.prevent = "_recorder_operate('start')"
                 @touchend.stop.prevent="_recorder_operate('stop')"
            >
              按住 录音
            </div>
          </div>

        </template>

      </div>
    </div>
  </div>
</template>
<style scoped>
  audio{ width: 100% ;  }
</style>
