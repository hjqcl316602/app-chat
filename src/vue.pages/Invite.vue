<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  import QRCode from 'qrcodejs2'
  import mem from '../vue.mixins/mem'
  export default {
    name: "Invite",
    components: {},
    mixins: [ mem ],
    data() {
      return {
        params:{
          fromUser:'',
          fromName:''
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
        this.params.fromUser = this.$route.query['fromUser'] || '';
        this.params.fromName = this.$route.query['fromName'] || '';
        if(!this.params.fromUser){
          let url =`${ window.location.href }?fromUser=${ this.userMessage['fromUser'] }&fromName=${this.userMessage['nickName'] }`;
          this._set_code(url);
          console.log(url)

        }else{
          document.title = '添加好友';
        }

      },
      _set_code(url){
        return new Promise((resolve,reject)=>{
          let offsetHeight = document.getElementById('qrcode').offsetHeight;
          let offsetWidth = document.getElementById('qrcode').offsetWidth;

          let qrcode = new QRCode('qrcode', {
            width: offsetWidth,     // 设置宽度
            height: offsetHeight,   // 设置高度
            text: url,
          });
          resolve()
        });
      },
      _add_friend(){
        let isLogin = sessionStorage.getItem('login-info');
        if(!isLogin){
          sessionStorage.setItem('redirect',window.location.href.split("#")[1]);
          this.$router.replace({ path : '/Login'})
        }else{
          this.$add_friend({ fromUser : this.params.fromUser }).then((res)=>{
            this.$toast('添加成功！');
            setTimeout(()=>{
              this.$router.replace({ path:'/Index'})
            },800)
          })
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
<div class="vc-fluid--h-min vp-bg vc-flex--center">
  <template v-if="params.fromUser">
    <div class="" style="width: 80%">
       <div class="vc-margin--bm">
         <span class="vc-text--baseline--md">是否确认添加【<span class="vc-text--bold"> {{ params.fromName }} </span>】成为您的好友？</span>
       </div>
      <div class="vp-btn__submit vp-btn--theme" @click="_add_friend">
        确认
      </div>
    </div>
  </template>
  <template v-else>
    <div class="" style="width: 50%">
      <div class="vp-ratio vc-border">
        <div class="vp-ratio__outer" data-ratio="1:1">
          <div class="vp-ratio__inner vc-padding__lg">
            <div class="vp-img__inner" id="qrcode">
            </div>
          </div>
        </div>
      </div>
      <div class="vc-margin--tp vc-text--center">
        <span class="vc-text--light">扫描二维码或分享链接</span>
      </div>
    </div>
  </template>

</div>
</template>
<style scoped>
  #qrcode img{ width: 100% ; height: 100% ;}
</style>
