<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import group  from '../vue.mixins/group'
  export default {
    name: "ChatFGroupUpdate",
    components: {},
    mixins: [ group ],
    data() {
      return {
        params:{
          groupName : '',
          groupId:''
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
        this.params.groupName = this.$route.query['groupName'];
      },
      _update_group_name(){
        if(!this.params.groupName){
          this.$toast('请输入群名称!')
        }else{
          this.$update_group_name(this.params).then(()=>{
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
         <div class="vp-input__clear" v-if="params.groupName" @click="params.groupName = ''">
           <i class="iconfont icon-del vc-text--light"></i>
         </div>
         <input type="text" class="vp-input" v-model="params.groupName" placeholder="请输入群名称...">
       </div>

      <div class="vc-margin__lg--tp">
        <div class="vp-btn__submit vp-btn--theme" @click="_update_group_name">保存</div>
      </div>

    </div>
  </div>

</template>
<style scoped></style>
