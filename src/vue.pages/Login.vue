<script  type="text/ecmascript-6" >
  import mem from '../vue.mixins/mem'
  export default {
    name: "Login",
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

      this._init_page();
    },
    methods:{
      _init_page(){
        let userInfo = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : {} ;
        //alert(JSON.stringify(userInfo))
        this.params.loginName = userInfo['loginName'];
        this.params.fromUser = userInfo['fromUser'];
        this.params.pwd = '';
        this.params.memId = userInfo['memId'] || 0 ;

        // 判断是否进入过注册，并判断是否存在用户，否则跳转到注册页面，
        let historyRouter = sessionStorage.getItem('router-history')? JSON.parse(sessionStorage.getItem('router-history')) : [];

        if( !historyRouter.includes('Regist') && !this.params.loginName){
          this.$router.replace('/Regist')
        }

      },
      _login(){

        let message = this._valid_params();
        if(message === 'yes'){
          this.$login(this.params).then((res)=>{
            let userInfo = {
              loginName : res['data']['loginName'],
              nickName : res['data']['nickName'],
              fromUser : res['data']['fromUser'],
              memId : res['data']['memId'],
              photo : res['data']['photo'],
            };
            this.$store.commit('get_user_message',userInfo)
            localStorage.setItem('user-info',JSON.stringify(userInfo));
            sessionStorage.setItem('login-info',true );
            let redirect = sessionStorage.getItem('redirect') || '/Index';
            this.$router.replace({ path : redirect })
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
        <input :type="params.type" class="vp-input  vp-input__bg--transparent vp-input__border--white vp-input__br-circle" placeholder="请输入6-10位的密码..." v-model="params.pwd" @keyup.enter="_login">
      </div>
      <div class="vc-margin__lg--tp">
        <div class="vp-btn__submit  vp-btn--theme vp-btn__br-circle vp-btn--shadow" @click="_login" >登录</div>
      </div>
      <div class="vc-margin__lg--tp vc-text--center vc-text--white">
        还未有账号，
        <router-link :to="{ name : 'Regist' }" class="vc-text--white vc-text--bold ">去注册</router-link>
      </div>
    </div>


  </div>
</template>

<style   scoped>
</style>
