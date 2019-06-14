<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import mem  from '../vue.mixins/mem'
  export default {
    name: "UserMessageUpdatePwd",
    components: {},
    mixins: [mem],
    data() {
      return {
        params:{
          oldPwd:'',
          newPwd:'',
          oldPwdType:'password',
          newPwdType:'password'
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

      },
      _update_pwd(){
        let message = this._valid_params();
        if(message === 'yes'){
          this.$update_pwd(this.params).then(()=>{
            this.$toast('密码修改成功！');
            setTimeout(()=>{
              this.$router.go(-1)
            },800)
          })
        }else{
          this.$toast(message)
        }
      },
      _valid_params(){
        //console.log(this.params.loginName)
        let regex_pwd = new RegExp('^\\S{6,10}');
        if(!regex_pwd.test(this.params.oldPwd)){
          return '请输入6-10位的旧密码';
        }
        if(!regex_pwd.test(this.params.newPwd)){
          return '请输入6-10位的新密码';
        }
        if( this.params.newPwd === this.params.oldPwd){
          return '新密码和旧密码一致';
        }

        return 'yes'
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
    <div class="vc-padding__lg">
      <div class="vp-input__outer vc-margin--bm">
        <div class="vp-input__clear vp-input__clear--double" v-if="params.oldPwd" >
          <i class="iconfont icon-yanjing1 vc-text--lg   vc-margin--rt"  @click="params.oldPwdType = ( params.oldPwdType === 'password') ? 'text' : 'password'"></i>
          <i class="iconfont icon-del vc-text--light" @click="params.oldPwd = ''"></i>
        </div>
        <input :type="params.oldPwdType" class="vp-input" v-model="params.oldPwd" placeholder="请输入6-10位的旧密码...">
      </div>
      <div class="vp-input__outer vc-margin--bm">
        <div class="vp-input__clear vp-input__clear--double" v-if="params.newPwd" >
          <i class="iconfont icon-yanjing1 vc-text--lg   vc-margin--rt"  @click="params.newPwdType = ( params.newPwdType === 'password') ? 'text' : 'password'"></i>
          <i class="iconfont icon-del vc-text--light" @click="params.newPwd = ''"></i>
        </div>
        <input :type="params.newPwdType" class="vp-input" v-model="params.newPwd" placeholder="请输入6-10位的新密码...">
      </div>

      <div class="vc-margin__lg--tp">
        <div class="vp-btn__submit vp-btn--theme" @click="_update_pwd">保存</div>
      </div>

    </div>
  </div>
</template>
<style scoped></style>
