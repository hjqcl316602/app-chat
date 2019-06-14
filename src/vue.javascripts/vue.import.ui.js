
import Vue from 'vue';

// van- ui 的模块导入
/*import Button from 'vant/lib/button';
import 'vant/lib/button/style';*/

//import 'vant/lib/dialog/style';
/*
 this.$dialog.alert({
            message: '获取班级名称失败'
          }).then(() => {});

this.$dialog.confirm({
  title:'确认信息',
  message:selectStu.join('、')
}).then(()=>{}).catch(()=>{})

*/
import { Dialog,Field,SwipeCell } from 'vant'

Vue.use(Dialog).use(Field).use(SwipeCell);

// cube- ui 的模块导入
/*
import Cube  from 'cube-ui'
Vue.use(Cube)
*/

// mand-mobile 的模块导入 ( 文本过大，基本上是一般的一倍)
//import Button from 'mand-mobile/lib/button'
//import  'mand-mobile/lib/button/style/index.css'

/*
import 'mand-mobile/lib/mand-mobile.css'
import  { Toast }  from 'mand-mobile'
Vue.use(Toast)
*/
// vue2-toast 的模块导入
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast, {
  defaultType: 'bottom',
  duration: 2500,
  wordWrap: true,
  width: 'auto'
});
