<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import mem  from '../vue.mixins/mem'
  export default {
    name: "UserMessageUpdate",
    components: {},
    mixins: [ mem ],
    data() {
      let nickName = this.$store.state.basic['userMessage']['nickName'] ;
       return {
        params:{
          nickName : nickName ,
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
      _update_name(){
        if(!this.params.nickName){
          this.$toast('请输入您的昵称!')
        }else{
          this.$update_nickname(this.params).then(()=>{


            setTimeout(()=>{
              this.$router.go(-1)
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
  <div class="vc-fluid--h-min vp-bg">
    <div class="vc-padding__lg">
      <div class="vp-input__outer">
        <div class="vp-input__clear" v-if="params.nickName" @click="params.nickName = ''">
          <i class="iconfont icon-del vc-text--light"></i>
        </div>
        <input type="text" class="vp-input" v-model="params.nickName" placeholder="请输入您的昵称...">
      </div>

      <div class="vc-margin__lg--tp">
        <div class="vp-btn__submit vp-btn--theme" @click="_update_name">保存</div>
      </div>

    </div>
  </div>

</template>
<style scoped></style>
