<template>
  <div id="app"  style="overflow: auto" >
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>


<script type="text/ecmascript-6">
export default {
  name: 'app',
  mounted(){
  },
  data(){
    return {
    }
  },
  methods:{

  }
  ,
  watch:{

  }
}
</script>
<style></style>
