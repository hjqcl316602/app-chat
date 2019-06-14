<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import group  from '../vue.mixins/group'
  import resource  from '../vue.mixins/resource'
  import mem  from '../vue.mixins/mem'
  export default {
    name: "UserMessage",
    components: {},
    mixins: [ mem , resource ],
    data() {
      return {

      }
    },
    mounted() {
      this._init_page();
    },
    activated() {

    },
    methods: {
      _init_page(){},
      _select_file(e){
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('file',file);

        this.$upload_file(1,formData).then((res)=>{

          this.$update_user_header({ photo : res })
          let message = Object.assign(this.userMessage,{ photo : res });
          this.$store.commit('get_user_message',message);
          localStorage.setItem('user-info',JSON.stringify(message));
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
  <div class="vc-fluid--h-min vp-bg">

    <div class="vc-padding__lg vc-border--bm">
      <div class="vc-flex--between-center">
        <span class="vc-text--bold">头像</span>
        <label class="vp-file">
          <div class="vp-img__inner vp-img__circle" data-round="60">
            <img :src="userMessage['photo']" alt="" class="vp-img--min" @load="$img_load" >
            <img src="../vue.images/icon-head-error.png" alt="" class="vp-img--error">
          </div>
          <input type="file" accept="image/*"  multiple  name="file-img" @change="_select_file">
        </label>
      </div>
    </div>

    <router-link tag="div" :to="{ name :'UserMessageUpdate'}">
      <div class="vc-padding__lg vc-border--bm">
        <div class="vc-flex--between-center">
          <span class="vc-text--bold">昵称</span>
          <div class="vc-flex vc-items--center">
            <span class="vc-margin--rt">{{ userMessage['nickName'] }}</span>
            <i class="iconfont icon-iconfontjiantou2 vc-text--light"></i>
          </div>

        </div>
      </div>
    </router-link>

    <router-link tag="div" :to="{ name :'UserMessageUpdatePwd'}">
      <div class="vc-padding__lg vc-border--bm">
        <div class="vc-flex--between-center">
          <span class="vc-text--bold">密码</span>
          <div class="vc-flex vc-items--center">
            <span class="vc-margin--rt vc-text--theme">修改</span>
            <i class="iconfont icon-iconfontjiantou2 vc-text--light"></i>
          </div>
        </div>
      </div>
    </router-link>


  </div>

</template>
<style scoped></style>
