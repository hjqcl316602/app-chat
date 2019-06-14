/**
 * Created by 41587 on 2018/9/9.
 */

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import * as configs from './vue.configs'

Vue.mixin({

  computed:{
    userMessage(){
      let  userMessage = this.$store.state.basic['userMessage'];
      console.log(userMessage)
      return userMessage;
    }
  },

  data(){
    return {

      popups:{ ['0']:false,['1']:false,['2']:false,['3']:false,['4']:false,['5']:false,['6']:false,['7']:false,['8']:false, }
      // 此处不能为数组，页面中修改之后不能起到效果
    }
  },



  beforeRouteEnter(to, from, next) {


    next()
  },
  beforeRouteLeave(to,from,next){
    // 商品详情页会通过分享，所以返回键就直接退出项目了，需要在meta信息中设置 back ，回到哪个页面
    let that = this;
    let bool = function(){
      let arr = Object.keys(that.popups) ;
      for(let n = 0 ; n < arr.length;n++){
        if(that.popups[arr[n]]){
          return true
        }
      }
      return false ;
    }();
    if( bool || ( this.popup && this.popup.show ) ){    // 由于子页面的该事件会后执行，所以目前只能通过在这里执行弹出框的显示和隐藏
      if(bool){
        let arr = Object.keys(that.popups) ;
        for(let n = 0 ; n < arr.length;n++){
          that.popups[arr[n]] = false
        }
      }

      if(this.popup && this.popup.show ){
        this.popup.show = false ;
      }

      next(false)
    }else{
      next()
    }
  },


});




