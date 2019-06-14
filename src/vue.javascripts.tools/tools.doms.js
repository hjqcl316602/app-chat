
let Doms = {}

Doms.ImgLoadProp = function(e){
  let  parentNode = e.target.parentNode || e.target.parentElement ;
  let imgBoxWidth = parentNode.offsetWidth;
  let imgBoxHeight = parentNode.offsetHeight;
  let imgHeight = e.target.height;
  let imgWidth = e.target.width;
  let imgBoxProp = imgBoxWidth / imgBoxHeight;
  let imgProp = imgWidth / imgHeight;
  if(imgProp >= imgBoxProp ){
    e.target.style.height = imgBoxHeight + 'px';
  }else{
    e.target.style.width = imgBoxWidth + 'px';
  }
};
Doms.setScrollToBottom= function () {
  var scrollHeight = (function getScrollHeight(){
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
      bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
  })();
  var windowHeight = (function getWindowHeight(){
    if(document.documentElement.clientHeight){
      return document.documentElement.clientHeight;
    } else {
      return document.body.clientHeight;
    }
  })();
  document.body.scrollTop = scrollHeight - windowHeight;
  document.documentElement.scrollTop = scrollHeight - windowHeight;  // 页面置底<br><br>　　document.body.scrollTop = 0；//页面置顶<br>　　document.documentElement.scrollTop = 0；
}


;(function(o) {

  //没有模块化就挂载到window，有模块化则可以进行导入导出功能的使用

  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = o;
  } else if (typeof define === "function" && define.amd) {
    define([], o);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }

    g.Doms = o;
  }
})(Doms);
