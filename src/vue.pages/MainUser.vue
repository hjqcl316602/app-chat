<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
   import basic  from '../vue.mixins/basic'
  export default {
    name: "MainUser",
    components: {},
    mixins: [ basic ],
    data() {
      return {}
    },
    mounted() {
      console.log(this.$store.state.basic)
    },
    activated() {      console.log('MainUser - activated')

      if(!this.$route.meta.isLoaded || (this.$route.meta.isLoaded && !this.$route.meta.isLoad)){
        this.$route.meta.isLoaded = true;
        this._init_page();
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
<div class="vc-text--center vc-text--lg vc-text--bold">
  <span class="red blue">
    个人中心
  </span>
  <span class=" blue red">
    个人中心
  </span>
</div>
</template>
<style scoped>

  .red { color: red }
  .blue { color: blue }
</style>
