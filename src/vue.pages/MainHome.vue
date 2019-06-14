<template>
  <div class="vc-bg vc-fluid--h">
    <md-button class="button button-positive" @click.native="clicked()">
      Click Me
    </md-button>
    <list class="list-ios">
      <item>
        <div class="vc-padding"></div>
      </item>
      <item>
        Item - 2
      </item>
      <item>
        Item - 3
      </item>
    </list>
    <div class="class-demo"></div>
    <img src="../vue.images/zly (11).jpg" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {
    //this._init_page();
  },
  methods: {
    _init_page() {
      $loading.show("拼命加载中..");
    }
  }
};
</script>

<style scoped>
</style>
