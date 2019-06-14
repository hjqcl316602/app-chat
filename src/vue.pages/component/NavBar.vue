<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  export default {
    name: "NavBar",
    components: {},
    mixins: [],
    data() {
      return {
        nav:{
          item:[
            { name:'消息',class:'index',value:'Index',pathName:'Index'},
            { name:'通讯录',class:'relation',value:'Relation',pathName:'Relation'},
            { name:'个人中心',class:'user',value:'User',pathName:'User'},
          ]
        }
      }
    },
    mounted() {
    },
    activated() {
      this._init_page();
    },
    props:{
      active:{
        type:String
      }
    },
    methods: {
      async _init_page() {

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
  <div class="vp-footer vp-footer--shadow vp-bg">
      <div class="vc-flex ">
        <router-link tag="div" class="vc-flex--fit vc-flex--center vp-row "
                     v-for="(item,index) in nav.item"
                     replace
                     :to="{ name :item['pathName']}"
                     :key = index
        >
          <span class="vc-text--bold" :class="{ 'vc-text--theme' : item['value'] == active }" >{{ item['name'] }}</span>
        </router-link>
      </div>
  </div>
</template>
<style scoped></style>
