<script  type="text/ecmascript-6" >
  import mem from '../vue.mixins/mem'
  export default {
    name: "Regist",
    mixins:[ mem ],
    data() {
      return {
        params:{
          loginName:'',
          memId:'',
          fromUser:'',
          pwd:'',
          type:'password'
        }
      };
    },
    mounted(){
      //this.$toast()

      this._init_page();
    },
    methods:{
      _init_page(){
        //let message = Validators.CodeNumberLen('111kjdksje..',6,10)
        //console.log(message)
      },
      _register(){
        let message = this._valid_params();
        if(message === 'yes'){

          this.$register(this.params).then((res)=>{
            this.$toast('恭喜您，注册成功！');
            let userInfo = {
              loginName : res['data']['loginName'],
              nickName : res['data']['nickName'],
              fromUser : res['data']['fromUser'],
              memId : res['data']['memId'],
              photo : res['data']['photo'],
            };
            localStorage.setItem('user-info',JSON.stringify(userInfo));

            setTimeout(()=>{
              this.$router.replace({ name : 'Login' })
            },800)

          })
        }else{
          this.$toast(message)
        }
      },
      _valid_params(){
        //console.log(this.params.loginName)
        let regex_name = new RegExp('^\\S{1,10}$');
        let regex_pwd = new RegExp('^\\S{6,10}');
        if(!regex_name.test(this.params.loginName)){
          return '请输入1-10位的用户名';
        }
        if(!regex_pwd.test(this.params.pwd)){
          return '请输入6-10位的密码';
        }
        return 'yes'
      }
    }
  };
</script>

<template>
  <div class="vc-fluid--h-min vp-bg--shade vc-flex--center">

    <div class="vc-fluid--w vc-padding__lg">
      <div class="vp-input__outer vc-margin--bm">
        <div class="vp-input__clear" v-if="params.loginName" @click="params.loginName = ''">
          <i class="iconfont icon-del vc-text--white"></i>
        </div>
        <input type="text" class="vp-input  vp-input__bg--transparent vp-input__border--white vp-input__br-circle" placeholder="请输入1-10位的用户名..." v-model="params.loginName">
      </div>
      <div class="vp-input__outer vc-margin--bm">
        <div class="vp-input__clear vp-input__clear--double  vc-flex vc-items--center " v-if="params.pwd" >
          <i class="iconfont icon-yanjing1 vc-text--lg vc-text--white vc-margin--rt"  @click="params.type = ( params.type === 'password') ? 'text' : 'password'"></i>
          <i class="iconfont icon-del vc-text--white" @click="params.pwd = ''"></i>
        </div>
        <input :type="params.type" class="vp-input  vp-input__bg--transparent vp-input__border--white vp-input__br-circle" placeholder="请输入6-10位的密码..." v-model="params.pwd">
      </div>
      <div class="vc-margin__lg--tp">
        <div class="vp-btn__submit  vp-btn--theme vp-btn__br-circle vp-btn--shadow" @click="_register">注册</div>
      </div>
      <div class="vc-margin__lg--tp vc-text--center vc-text--white">
        已有账号，
        <router-link :to="{ name : 'Login' }" replace class="vc-text--white vc-text--bold ">去登录</router-link>
      </div>
    </div>


  </div>
</template>

<style   scoped>
</style>
